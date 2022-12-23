**Example for LRUCacheNode  javascript**

Here is an example of an LRUCacheNode class in JavaScript:

```js
class LRUCacheNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}
```
This class has four instance variables:

key: the key associated with the cached item
value: the value of the cached item
next: a reference to the next node in the linked list
prev: a reference to the previous node in the linked list
The next and prev variables are used to link the nodes together in a doubly linked list, which is typically used to implement an LRU cache.

Here is an example of how you might use the LRUCacheNode class to create a node and add it to a linked list:

Copy code
const node1 = new LRUCacheNode(1, "value1");
const node2 = new LRUCacheNode(2, "value2");

node1.next = node2;
node2.prev = node1;
This creates two nodes with keys 1 and 2, and values "value1" and "value2", respectively. The next and prev variables are used to link the two nodes together in a doubly linked list.