import React, { useState } from 'react';


const Sorting = () => {

  
  const randomizeArray = (count) => {
    return Array.from({ length: count }, (_, index) => ({
      value: Math.floor(Math.random() * 100) + 1,
      id: index + 1,
    }));
  };
  const [bars, setBars] = useState(randomizeArray(35));
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


  const insertionSort = async () => {
    const arrayBars = [...bars];
    const length = arrayBars.length;

    for (let i = 1; i < length; i++) {
      const currentBar = arrayBars[i];
      let j = i - 1;

      while (j >= 0 && arrayBars[j].value > currentBar.value) {
        arrayBars[j + 1] = arrayBars[j];
        j--;
      }

      arrayBars[j + 1] = currentBar;
      setBars([...arrayBars]);
      await delay(20);
    }
  };
  const selectionSort = async () => {
    const arrayBars = [...bars];
    const length = arrayBars.length;

    for (let i = 0; i < length - 1; i++) {
      let minIndex = i;

      for (let j = i + 1; j < length; j++) {
        if (arrayBars[j].value < arrayBars[minIndex].value) {
          minIndex = j;
        }
      }

      const temp = arrayBars[i];
      arrayBars[i] = arrayBars[minIndex];
      arrayBars[minIndex] = temp;

      setBars([...arrayBars]);
      await delay(20);
    }
  };
  const bubbleSort = async () => {
    const arrayBars = [...bars];

    for (let i = 0; i < arrayBars.length - 1; i++) {
      for (let j = 0; j < arrayBars.length - 1 - i; j++) {
        if (arrayBars[j].value > arrayBars[j + 1].value) {

          const temp = arrayBars[j];
          arrayBars[j] = arrayBars[j + 1];
          arrayBars[j + 1] = temp;

          setBars([...arrayBars]);
          await delay(10);
        }
      }
    }
  };
  const quickSort = async () => {
    const arrayBars = [...bars];

    const partition = async (low, high) => {
      const pivot = arrayBars[high];
      let i = low - 1;

      for (let j = low; j < high; j++) {
        if (arrayBars[j].value < pivot.value) {
          i++;

          const temp = arrayBars[i];
          arrayBars[i] = arrayBars[j];
          arrayBars[j] = temp;

          setBars([...arrayBars]);
          await delay(20);
        }
      }


      const temp = arrayBars[i + 1];
      arrayBars[i + 1] = arrayBars[high];
      arrayBars[high] = temp;

      setBars([...arrayBars]);
      return i + 1;
    };

    const quickSortHelper = async (low, high) => {
      if (low < high) {
        const partitionIndex = await partition(low, high);


        await quickSortHelper(low, partitionIndex - 1);
        await quickSortHelper(partitionIndex + 1, high);
      }
    };

    await quickSortHelper(0, arrayBars.length - 1);
  };
  const mergeSort = async () => {
    const merge = async (left, right) => {
      const result = [];
      let leftIndex = 0;
      let rightIndex = 0;

      while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex].value < right[rightIndex].value) {
          result.push(left[leftIndex]);
          leftIndex++;
        } else {
          result.push(right[rightIndex]);
          rightIndex++;
        }
      }

      // return result.concat((left.slice(leftIndex))).concat(right.slice(rightIndex));
      return result.concat(
        Array.isArray(left) ? left.slice(leftIndex) : [],
        Array.isArray(right) ? right.slice(rightIndex) : []
      );
    };

    const mergeSortHelper = async (array) => {
      const length = array.length;
      if (length <= 1) {
        return array;
      }

      const middle = Math.floor(length / 2);
      const left = array.slice(0, middle);
      const right = array.slice(middle);

      return await merge(mergeSortHelper(left), mergeSortHelper(right));
    };

    const sortedArray = await mergeSortHelper(bars);
    setBars([...sortedArray]);
  };

  const shellSort = async () => {
    const arrayBars = [...bars];
    const length = arrayBars.length;


    let gap = 1;
    while (gap < length / 3) {
      gap = 3 * gap + 1;
    }

    while (gap > 0) {
      for (let i = gap; i < length; i++) {
        const temp = arrayBars[i];
        let j = i;

        while (j >= gap && arrayBars[j - gap].value > temp.value) {
          arrayBars[j] = arrayBars[j - gap];
          j -= gap;
        }

        arrayBars[j] = temp;
        setBars([...arrayBars]);
        await delay(20);
      }

      gap = Math.floor(gap / 3);
    }
  };
  const changeSize = async (barHeight) => {
    const newSize = bars.map((bar) => ({
      ...bar,
      value: Math.max(10, bar.value - barHeight),
    }));

    setBars(newSize);
    await delay(50);
  };


  return (
    <div>

      <div>
        <button onClick={() => setBars(randomizeArray(35))}>Randomize Array</button>
        <button onClick={() => insertionSort()}>Insertion Sort</button>
        <button onClick={() => selectionSort()}>Selection Sort</button>
        <button onClick={() => bubbleSort()}>Bubble Sort</button>
        <button onClick={() => quickSort()}>Quick Sort</button>
        <button onClick={() => mergeSort()}>Merge Sort</button>
        <button onClick={() => shellSort()}>Shell Sort</button>
        <button onClick={() => changeSize(30)}>Change Size</button>
      </div>
      <div className="bars-container">
        {bars.map((bar) => (
          <div key={bar.id} className="bar" style={{ height: `${bar.value * 3}px` }}>
            {bar.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sorting;
