function longestSubarrayLength(nums, k) {
  let maxLength = 0;
  let currentSum = 0;
  let left = 0;

  for (let right = 0; right < nums.length; right += 1) {
    currentSum += nums[right];

    while (currentSum > k) {
      currentSum -= nums[left];
      left += 1;
    }

    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

export default longestSubarrayLength;
