/**
 * Visualization Library for Algorithm Course
 * Provides reusable components for data structure visualizations
 * Uses: Canvas for arrays/sorting, DOM for stack/queue, D3.js for trees (when available)
 */

// ===== ARRAY VISUALIZATION (Canvas-based) =====
const ArrayViz = {
  create(containerId, array, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container #${containerId} not found`);
      return null;
    }

    // Clear container
    container.innerHTML = '';
    container.className = 'array-visual';

    const instance = {
      container,
      array: [...array],
      options: {
        cellWidth: options.cellWidth || 45,
        maxHeight: options.maxHeight || 150,
        minHeight: options.minHeight || 30,
        showIndices: options.showIndices !== false,
        ...options
      },
      highlights: {},

      draw(highlighting = {}) {
        this.highlights = highlighting;
        this.container.innerHTML = '';

        const maxVal = Math.max(...this.array);

        this.array.forEach((val, idx) => {
          const cell = document.createElement('div');
          cell.className = 'array-cell';
          cell.id = `${containerId}-cell-${idx}`;

          // Determine state
          if (highlighting.comparing?.includes(idx)) {
            cell.classList.add('comparing');
          }
          if (highlighting.swapping?.includes(idx)) {
            cell.classList.add('swapping');
          }
          if (highlighting.sorted?.includes(idx)) {
            cell.classList.add('sorted');
          }

          // Create bar
          const bar = document.createElement('div');
          bar.className = 'bar';
          const barHeight = (val / maxVal) * this.options.maxHeight + this.options.minHeight;
          bar.style.height = `${barHeight}px`;
          bar.textContent = val;

          cell.appendChild(bar);

          // Add index
          if (this.options.showIndices) {
            const indexLabel = document.createElement('div');
            indexLabel.className = 'bar-index';
            indexLabel.textContent = idx;
            cell.appendChild(indexLabel);
          }

          this.container.appendChild(cell);
        });
      },

      async swap(i, j, delay = 500) {
        [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
        this.draw({ swapping: [i, j] });
        await Utils.sleep(delay);
        this.draw();
      },

      async highlight(indices, type = 'comparing', delay = 300) {
        const highlighting = {};
        highlighting[type] = indices;
        this.draw(highlighting);
        await Utils.sleep(delay);
      },

      async markSorted(index, delay = 200) {
        this.highlights.sorted = this.highlights.sorted || [];
        this.highlights.sorted.push(index);
        this.draw(this.highlights);
        await Utils.sleep(delay);
      },

      reset() {
        this.highlights = {};
        this.draw();
      }
    };

    instance.draw();
    return instance;
  }
};

// ===== STACK VISUALIZATION (DOM-based) =====
const StackViz = {
  create(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container #${containerId} not found`);
      return null;
    }

    container.innerHTML = '<div class="visual-container"><div class="stack-box"></div></div>';
    const stackBox = container.querySelector('.stack-box');

    const instance = {
      container: stackBox,
      stack: [],
      maxSize: options.maxSize || 10,

      push(value) {
        if (this.stack.length >= this.maxSize) {
          throw new Error('Stack overflow! Stack dolu.');
        }

        this.stack.push(value);

        const item = document.createElement('div');
        item.className = 'stack-item';
        item.textContent = value;
        this.container.appendChild(item);

        return value;
      },

      pop() {
        if (this.stack.length === 0) {
          throw new Error('Stack underflow! Stack boş.');
        }

        const value = this.stack.pop();
        const item = this.container.lastElementChild;

        if (item) {
          item.classList.add('leaving');
          setTimeout(() => item.remove(), 500);
        }

        return value;
      },

      peek() {
        if (this.stack.length === 0) {
          return null;
        }

        const item = this.container.lastElementChild;
        if (item) {
          const originalBg = item.style.background;
          item.style.background = Utils.getCssVar('--accent-orange');
          setTimeout(() => item.style.background = originalBg, 500);
        }

        return this.stack[this.stack.length - 1];
      },

      isEmpty() {
        return this.stack.length === 0;
      },

      size() {
        return this.stack.length;
      },

      clear() {
        this.stack = [];
        this.container.innerHTML = '';
      },

      getArray() {
        return [...this.stack];
      }
    };

    return instance;
  }
};

// ===== QUEUE VISUALIZATION (DOM-based) =====
const QueueViz = {
  create(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container #${containerId} not found`);
      return null;
    }

    container.innerHTML = '<div class="visual-container"><div class="queue-track"></div></div>';
    const track = container.querySelector('.queue-track');

    const instance = {
      container: track,
      queue: [],
      maxSize: options.maxSize || 10,

      enqueue(value) {
        if (this.queue.length >= this.maxSize) {
          throw new Error('Queue full! Kuyruk dolu.');
        }

        this.queue.push(value);

        const item = document.createElement('div');
        item.className = 'queue-item new';
        item.textContent = value;
        this.container.appendChild(item);

        return value;
      },

      dequeue() {
        if (this.queue.length === 0) {
          throw new Error('Queue empty! Kuyruk boş.');
        }

        const value = this.queue.shift();
        const item = this.container.firstElementChild;

        if (item) {
          item.classList.add('leaving');
          setTimeout(() => item.remove(), 500);
        }

        return value;
      },

      front() {
        if (this.queue.length === 0) {
          return null;
        }

        const item = this.container.firstElementChild;
        if (item) {
          const originalBg = item.style.background;
          item.style.background = Utils.getCssVar('--accent-orange');
          setTimeout(() => item.style.background = originalBg, 500);
        }

        return this.queue[0];
      },

      isEmpty() {
        return this.queue.length === 0;
      },

      size() {
        return this.queue.length;
      },

      clear() {
        this.queue = [];
        this.container.innerHTML = '';
      },

      getArray() {
        return [...this.queue];
      }
    };

    return instance;
  }
};

// ===== TREE VISUALIZATION (SVG-based, D3.js optional) =====
const TreeViz = {
  /**
   * Create a tree visualization
   * @param {string} containerId - Container element ID
   * @param {object} treeData - Tree data in format: { value, left, right } or { value, children: [] }
   * @param {object} options - Configuration options
   */
  create(containerId, treeData, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container #${containerId} not found`);
      return null;
    }

    const width = options.width || container.clientWidth || 600;
    const height = options.height || 400;
    const nodeRadius = options.nodeRadius || 25;

    // Check if D3.js is available
    if (typeof d3 !== 'undefined') {
      return this.createWithD3(container, treeData, width, height, nodeRadius, options);
    } else {
      return this.createWithVanilla(container, treeData, width, height, nodeRadius, options);
    }
  },

  // D3.js-based implementation (when D3 is loaded)
  createWithD3(container, treeData, width, height, nodeRadius, options) {
    container.innerHTML = '';
    container.className = 'tree-container';

    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .style('max-width', '100%');

    const g = svg.append('g')
      .attr('transform', `translate(${width / 2}, 40)`);

    // Create tree layout
    const treeLayout = d3.tree()
      .size([width - 100, height - 100])
      .separation((a, b) => (a.parent === b.parent ? 1 : 1.2));

    const root = d3.hierarchy(treeData);
    const treeNodes = treeLayout(root);

    // Draw edges
    const links = g.selectAll('.tree-edge')
      .data(treeNodes.links())
      .enter()
      .append('line')
      .attr('class', 'tree-edge')
      .attr('x1', d => d.source.x - width / 2)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x - width / 2)
      .attr('y2', d => d.target.y);

    // Draw nodes
    const nodes = g.selectAll('.tree-node-group')
      .data(treeNodes.descendants())
      .enter()
      .append('g')
      .attr('class', 'tree-node-group')
      .attr('transform', d => `translate(${d.x - width / 2}, ${d.y})`);

    nodes.append('circle')
      .attr('class', 'tree-node')
      .attr('r', nodeRadius);

    nodes.append('text')
      .attr('class', 'tree-text')
      .attr('dy', 5)
      .attr('text-anchor', 'middle')
      .text(d => d.data.value);

    return {
      svg,
      nodes,
      links,

      highlight(values, color) {
        const colorVar = color || Utils.getCssVar('--accent-orange');
        this.nodes.selectAll('circle')
          .transition()
          .duration(300)
          .style('fill', d => values.includes(d.data.value) ? colorVar : Utils.getCssVar('--accent-blue'));
      },

      async traverse(order, delay = 500) {
        for (const value of order) {
          this.highlight([value], Utils.getCssVar('--accent-orange'));
          await Utils.sleep(delay);
          this.highlight([value], Utils.getCssVar('--accent-green'));
        }
      },

      reset() {
        this.nodes.selectAll('circle')
          .transition()
          .duration(300)
          .style('fill', Utils.getCssVar('--accent-blue'));
      }
    };
  },

  // Vanilla JavaScript implementation (fallback when D3 is not loaded)
  createWithVanilla(container, treeData, width, height, nodeRadius, options) {
    container.innerHTML = '';
    container.className = 'tree-container';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    container.appendChild(svg);

    // Calculate node positions (simple binary tree layout)
    const positions = [];
    const levelHeight = (height - 80) / this.getTreeHeight(treeData);

    const calculatePositions = (node, x, y, level, spread) => {
      if (!node) return;

      positions.push({ node, x, y });

      const nextSpread = spread / 2;
      const nextY = y + levelHeight;

      if (node.left) {
        calculatePositions(node.left, x - spread, nextY, level + 1, nextSpread);
      }
      if (node.right) {
        calculatePositions(node.right, x + spread, nextY, level + 1, nextSpread);
      }
    };

    calculatePositions(treeData, width / 2, 40, 0, width / 4);

    // Draw edges
    positions.forEach(pos => {
      if (pos.node.left) {
        const leftPos = positions.find(p => p.node === pos.node.left);
        if (leftPos) {
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', pos.x);
          line.setAttribute('y1', pos.y);
          line.setAttribute('x2', leftPos.x);
          line.setAttribute('y2', leftPos.y);
          line.setAttribute('class', 'tree-edge');
          svg.appendChild(line);
        }
      }
      if (pos.node.right) {
        const rightPos = positions.find(p => p.node === pos.node.right);
        if (rightPos) {
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', pos.x);
          line.setAttribute('y1', pos.y);
          line.setAttribute('x2', rightPos.x);
          line.setAttribute('y2', rightPos.y);
          line.setAttribute('class', 'tree-edge');
          svg.appendChild(line);
        }
      }
    });

    // Draw nodes
    const nodeElements = [];
    positions.forEach(pos => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('transform', `translate(${pos.x}, ${pos.y})`);

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('r', nodeRadius);
      circle.setAttribute('class', 'tree-node');
      circle.setAttribute('data-value', pos.node.value);

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('class', 'tree-text');
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dy', 5);
      text.textContent = pos.node.value;

      g.appendChild(circle);
      g.appendChild(text);
      svg.appendChild(g);

      nodeElements.push({ value: pos.node.value, circle });
    });

    return {
      svg,
      nodeElements,

      highlight(values, color) {
        const colorValue = color || Utils.getCssVar('--accent-orange');
        this.nodeElements.forEach(({ value, circle }) => {
          if (values.includes(value)) {
            circle.style.fill = colorValue;
          } else {
            circle.style.fill = Utils.getCssVar('--accent-blue');
          }
        });
      },

      async traverse(order, delay = 500) {
        for (const value of order) {
          this.highlight([value], Utils.getCssVar('--accent-orange'));
          await Utils.sleep(delay);
          this.highlight([value], Utils.getCssVar('--accent-green'));
        }
      },

      reset() {
        this.nodeElements.forEach(({ circle }) => {
          circle.style.fill = Utils.getCssVar('--accent-blue');
        });
      }
    };
  },

  getTreeHeight(node) {
    if (!node) return 0;
    const leftHeight = this.getTreeHeight(node.left);
    const rightHeight = this.getTreeHeight(node.right);
    return 1 + Math.max(leftHeight, rightHeight);
  }
};

// ===== LINKED LIST VISUALIZATION (DOM-based) =====
const LinkedListViz = {
  create(containerId, listData, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container #${containerId} not found`);
      return null;
    }

    const instance = {
      container,
      list: listData || [],
      options,

      draw() {
        this.container.innerHTML = '';
        this.container.className = 'linked-list-container';

        this.list.forEach((value, idx) => {
          // Create node
          const node = document.createElement('div');
          node.className = 'll-node';

          const dataDiv = document.createElement('div');
          dataDiv.className = 'll-node-data';
          dataDiv.textContent = value;

          const nextDiv = document.createElement('div');
          nextDiv.className = 'll-node-next';
          nextDiv.textContent = idx < this.list.length - 1 ? '→' : 'null';

          node.appendChild(dataDiv);
          node.appendChild(nextDiv);

          this.container.appendChild(node);

          // Add arrow between nodes
          if (idx < this.list.length - 1) {
            const arrow = document.createElement('div');
            arrow.className = 'll-arrow';
            arrow.textContent = '→';
            this.container.appendChild(arrow);
          }
        });
      },

      append(value) {
        this.list.push(value);
        this.draw();
      },

      prepend(value) {
        this.list.unshift(value);
        this.draw();
      },

      removeAt(index) {
        if (index >= 0 && index < this.list.length) {
          this.list.splice(index, 1);
          this.draw();
        }
      },

      clear() {
        this.list = [];
        this.draw();
      }
    };

    instance.draw();
    return instance;
  }
};

// ===== EXPORT AS GLOBAL VIZ OBJECT =====
window.Viz = {
  Array: ArrayViz,
  Stack: StackViz,
  Queue: QueueViz,
  Tree: TreeViz,
  LinkedList: LinkedListViz
};

console.log('✅ Visualization library loaded');
