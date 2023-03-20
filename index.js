const Node = (value = null, left = null, right = null) => {
    const getValue = () => value;

    return {
        getValue,
        left,
        right,
    }
}

const BinarySearchTree = (arrayValues) => {
    let root = null;

    const filterDuplicates = (arrayToFilter) => {
        // We are creating a set and deconstructing its contents into a new array.
        // This is done in O(N) time and is a better alternative to looping through
        // every element in the list and using Array.includes(). Using includes()
        // increases the time complexity to O(N^2).
        return [...new Set(arrayToFilter)];
    }

    const buildTree = (values) => {
        
        // don't call filter values here yet
        if(values.length <= 0) return null;

        let mid = Math.floor(values.length / 2);
        let root = Node(values[mid]);
        console.log(`value of node: ${root.getValue()}`)

        root.left = buildTree(values.slice(0, mid));
        root.right = buildTree(values.slice(mid + 1));

        return root;
    }

    const prettyPrint = (node, prefix = '', isLeft = true) => {
        if (node.right !== null) {
          prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.getValue()}`);
        if (node.left !== null) {
          prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }

    const sortArrays = (left, right) => {
        const sortedArray = [];

        while(left.length > 0 && right.length > 0) {
            if(left[0] < right[0]) {
                sortedArray.push(left.shift());
            } else {
                sortedArray.push(right.shift());
            }
        }

        return [...sortedArray, ...left, ...right];
    }

    const mergeSort = (values) => {
        if(values.length <= 1) return values;

        let mid = Math.floor(values.length / 2);

        let leftArray = mergeSort(values.slice(0, mid));
        let rightArray = mergeSort(values.slice(mid));

        return sortArrays(leftArray, rightArray);
    }

    const print = () => {
        prettyPrint(root);
    }

    /**
     * This function is used to set up the tree when the user
     * provides an input to the binary search tree.
     */
    const init = () => {
        const filteredInputValues = filterDuplicates(arrayValues);
        const sortedInputValues = mergeSort(filteredInputValues);
        console.log(`operating on ${sortedInputValues}`);
        root = buildTree(sortedInputValues);
    }

    // Initialize tree
    init();

    return {
        print,
    }
}

const bst = BinarySearchTree([5,3,1,2,6,9,15,12,2, 14, 15, 15 ,15]);
bst.print();

