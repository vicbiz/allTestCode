

function ListNode(val) {
    this.val = val;
    this.next = null;
}
   
var addTwoNumbers = function(l1, l2) {
    let node = null;

    do {
        let v1 = l1.val;
        let v2 = l2.val;
        node.val = new ListNode(l1.val + l2.val)
    } while (true)



    const carry = arguments[2]
    if (l1 || l2) {
        const nodeValue1 = l1 ? l1.val : 0
        const val2 = l2 ? l2.val : 0
        const next1 = l1 ? l1.next : null
        const next2 = l2 ? l2.next : null
        const val = carry ? nodeValue1 + val2 + 1 : nodeValue1 + val2
        node = new ListNode(val % 10)
        node.next = addTwoNumbers(next1, next2, val >= 10)  
    } else if (carry) {
        node = new ListNode(1)
        node.next = null
    }
    return node
};

let a = new ListNode(2);
a.next = new ListNode(4);
a.next.next = new ListNode(3);

let b = new ListNode(5);
b.next = new ListNode(6);
b.next.next = new ListNode(4);

let c = addTwoNumbers(a,b);
console.log(c);

