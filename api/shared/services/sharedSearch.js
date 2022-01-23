const searchQuery = (searchKey, keyNeedToSearchIn) => {
  const searchQuery_ = {
    $or: []
  };
  keyNeedToSearchIn.forEach(key => {
    let newObj = {};
    if (key.type && key.type === 'number') {
      newObj = {
        $where: `function() { return this.${
          key.value
        }.toString().match(${Number(searchKey)}) != null; }`
      };
    } else {
      newObj[key.value] = {
        $regex: searchKey,
        $options: 'i'
      };
    }
    searchQuery_.$or.push(newObj);
  });

  return searchQuery_;
};
module.exports = searchQuery;
