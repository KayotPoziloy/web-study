export function swapElements(array, index1, index2) {
    const num1 = array[index1]
    const num2 = array[index2]

    array[index2] = num1
    array[index1] = num2

    return [...array]
}

