class Node<T> {
    value: T;
    next: Node<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}


class LinkedList<T> {
    private head: Node<T> | null;
    private length: number;

    constructor() {
        this.head = null;
        this.length = 0;
    }

    push(value: T): void {
        if (this.length === 0) {
            this.unshift(value);
        } else {
            const newNode = new Node(value);
            const lastNode = this.getNode(this.length - 1);
            lastNode!.next = newNode;
            ++this.length;
        }
    }

    unshift(value: T): void {
        const newNode: Node<T> = new Node(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        ++this.length;
    }

    shift(): T {
        if (!this.head) throw Error("LinkedList is empty");

        const head = this.head;
        this.head = this.head.next;
        --this.length;

        return head.value;
    }

    getNode(index: number): Node<T> | null {
        this.__is_index_out_of_range(index);
        if (index === 0) {
            return this.head;
        }

        var current = this.head as Node<T>;
        var counter = 0;
        while (counter !== index) {
            current = current.next as Node<T>;
            ++counter;
        }
        return current;
    }

    get(index: number): T {
        const targetNode = this.getNode(index) as Node<T>;
        return targetNode.value;
    }

    set(index: number, value: T): boolean {
        const node = this.getNode(index) as Node<T>;
        node.value = value;
        return true;
    }

    remove(index: number): boolean {
        this.__is_index_out_of_range(index);
        if (index === 0) {
            this.shift();
            return true;
        }
        const prev = this.getNode(index - 1) as Node<T>;
        const removedNode = prev.next as Node<T>;
        prev.next = removedNode.next;

        // decrementing the length property
        --this.length;
        return true;
    }

    size(): number {
        return this.length;
    }

    __is_index_out_of_range(index: number): void {
        if (index < 0 || index >= this.length) throw Error(`Index ${index} out of range`);
    }


    // make a clone of the linked list
    clone(): LinkedList<T> {
        const clonedOne: LinkedList<T> = new LinkedList();
        let current: Node<T> | null = this.head;
        while(current) {
            clonedOne.push(current.value);
            current = current.next;
        }

        return clonedOne;
    }

    // make an array of it
    toArray(): T[] {
        const result: T[] = [];
        let current = this.head;
        while(current) {
            result.push(current.value);
            current = current.next;
        }

        return result;
    }
}


export default LinkedList;

// const linked_list = new LinkedList();

// for(let i=0; i<7; ++i) {
//     linked_list.unshift(i+1);
// }

// console.log(linked_list.get(5));
// linked_list.set(5, "Farhana Homayra");
// console.log(linked_list.get(5));