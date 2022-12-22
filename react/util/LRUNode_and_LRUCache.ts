class LRUCacheNode<TKey, TValue> {
    public readonly key: TKey;

    public readonly value: TValue;

    public next: LRUCacheNode<TKey, TValue> | null;

    public prev: LRUCacheNode<TKey, TValue> | null;

    constructor(key: TKey, value: TValue, next?: LRUCacheNode<TKey, TValue>, prev?: LRUCacheNode<TKey, TValue>) {
      this.key = key;
      this.value = value;
      this.next = next || null;
      this.prev = prev || null;
    }
}

export default LRUCacheNode;


/* eslint-disable no-param-reassign */
import LRUCacheNode from './LRUNode';

const DEFAULT_SIZE = 10;

class LRU<TKey extends string = string, TValue = any> {
    public limit: number;

    private size: number;

    private head: LRUCacheNode<TKey, TValue> | null = null;

    private tail: LRUCacheNode<TKey, TValue> | null = null;

    private cacheMap: Map<string, any>;

    constructor(limit: number = DEFAULT_SIZE) {
      this.size = 0;
      this.limit = limit;
      this.head = null;
      this.tail = null;
      this.cacheMap = new Map();
    }

    public get length() {
      return this.size;
    }

    public get first() {
      return this.head?.value;
    }

    public get last() {
      return this.tail?.value;
    }

    public keys() {
      return Array.from(this.cacheMap.keys());
    }

    public values() {
      return Array.from(this.cacheMap.values()).map(node => node.value);
    }

    public has(key: TKey) {
      return this.cacheMap.has(key);
    }

    set(key: TKey, value: TValue) {
      const existingNode = this.cacheMap.get(key);
      if (existingNode) {
        this.detach(existingNode);
        this.size--;
      } else if (this.size === this.limit) {
        if (this.tail?.key) {
          this.cacheMap.delete(this.tail.key);
          this.detach(this.tail);
        }
        this.size--;
      }

      if (!this.head) {
        // eslint-disable-next-line no-multi-assign
        this.head = this.tail = new LRUCacheNode(key, value);
      } else {
        const node = new LRUCacheNode(key, value, this.head);
        this.head.prev = node;
        this.head = node;
      }

      this.cacheMap.set(key, this.head);
      this.size++;
    }

    read(key: TKey) {
      const existingNode = this.cacheMap.get(key);
      if (existingNode) {
        const { value } = existingNode;
        if (this.head !== existingNode) {
          this.set(key, value);
        }
        return value;
      }

      console.warn(`Item not available in cache for key ${key}`);
    }

    detach(node: LRUCacheNode<TKey, TValue>) {
      if (node.prev !== null) {
        node.prev.next = node.next;
      } else {
        this.head = node.next;
      }

      if (node.next !== null) {
        node.next.prev = node.prev;
      } else {
        this.tail = node.prev;
      }
    }

    clear() {
      this.head = null;
      this.tail = null;
      this.size = 0;
      this.cacheMap = new Map();
    }
}

export default LRU;
