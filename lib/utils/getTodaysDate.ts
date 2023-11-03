


function addOrd(n: number) {
  var ords = [, 'st', 'nd', 'rd'];
  var ord, m = n % 100;
  return n + ((m > 10 && m < 14) ? 'th' : ords[m % 10] || 'th');
}

export function getTodaysDate() {
  const d = new Date()
  var months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Copy date object so don't modify original
  var e = new Date(d);

  // Add two weeks (14 days)
  e.setDate(e.getDate());
  return addOrd(e.getDate()) + ' ' + months[e.getMonth()] + ' ' + e.getFullYear();
}