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

    const buildTree = () => {
        return mergeSort(arrayValues);
    }

    const sortArrays = (left, right) => {
        let mergedArray = [];
        while (left.length && right.length) {
            // remove duplicates while sorting.
            // increases complexity while sorting
            // but will reduce tree size
            if(mergedArray.includes(left[0])) {
                left.shift();
            }
            if(mergedArray.includes(right[0])) {
                right.shift();
            }
            if (left[0] < right[0]) {
                mergedArray.push(left.shift());
            } else {
                mergedArray.push(right.shift());
            }
        }

        // Append whatever elements were left in the array
        return [...mergedArray, ...left, ...right];
    }

    const mergeSort = (values) => {
        if (values.length <= 1) {
            return values;
        }
        let midIndex = Math.floor(values.length / 2);
        let leftArray = values.slice(0, midIndex);
        let rightArray = values.slice(midIndex);

        let sortedLeft = mergeSort(leftArray);
        let sortedRight = mergeSort(rightArray);

        return sortArrays(sortedLeft, sortedRight);
    }

    return {
        buildTree,
    }
}

const bst = BinarySearchTree([5,3,1,2,6,9,15,12,2]);
console.log(bst.buildTree());

