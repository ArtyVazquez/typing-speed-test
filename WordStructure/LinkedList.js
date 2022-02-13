class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
      }
}


class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    add(data) {
        if (this.head == null) {
            this.head = new Node(data);
            this.tail = head;
        } else {
            temp = new Node(data);
            temp.prev = this.tail;
            this.tail.next = temp;
            this.tail = temp;
        }
    }
}