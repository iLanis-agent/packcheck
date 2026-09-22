/* PackCheck engine - pure functions for reusable packing lists. */
(function (root) {
  'use strict';
  var nextId = 1;
  function uid() { return 'i' + (nextId++) + '-' + Math.random().toString(36).slice(2, 8); }

  function makeList(name) {
    name = (name || '').trim();
    if (!name) throw new Error('list needs a name');
    return { id: uid(), name: name, items: [] };
  }

  function addItem(list, text, essential) {
    text = (text || '').trim();
    if (!text) throw new Error('item needs text');
    if (list.items.some(function (i) { return i.text.toLowerCase() === text.toLowerCase(); })) {
      throw new Error('duplicate item: ' + text);
    }
    var item = { id: uid(), text: text, essential: !!essential, packed: false };
    list.items.push(item);
    return item;
  }

  function toggleItem(list, itemId) {
    var it = list.items.find(function (i) { return i.id === itemId; });
    if (!it) throw new Error('no such item');
    it.packed = !it.packed;
    return it;
  }

  function removeItem(list, itemId) {
    var n = list.items.length;
    list.items = list.items.filter(function (i) { return i.id !== itemId; });
    return list.items.length < n;
  }

  // progress: packed count, total, and the essentials still unpacked
  function progress(list) {
    var total = list.items.length;
    var packed = list.items.filter(function (i) { return i.packed; }).length;
    var missingEssentials = list.items.filter(function (i) { return i.essential && !i.packed; });
    return {
      total: total,
      packed: packed,
      pct: total ? Math.round((packed / total) * 100) : 0,
      missingEssentials: missingEssentials,
      ready: total > 0 && missingEssentials.length === 0 && packed === total
    };
  }

  // reset for the next trip: everything unpacked, list kept
  function resetList(list) {
    list.items.forEach(function (i) { i.packed = false; });
    return list;
  }

  var api = { makeList: makeList, addItem: addItem, toggleItem: toggleItem, removeItem: removeItem, progress: progress, resetList: resetList };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.PackCheck = api;
})(typeof window !== 'undefined' ? window : this);
