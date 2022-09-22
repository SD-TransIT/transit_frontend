const dayNumberToLabel = (day: number) => {
  switch (day) {
    case 1:
      return 'day.monday.label';
    case 2:
      return 'day.tuesday.label';
    case 3:
      return 'day.wednesday.label';
    case 4:
      return 'day.thursday.label';
    case 5:
      return 'day.friday.label';
    case 6:
      return 'day.saturday.label';
    case 7:
      return 'day.sunday.label';
    default:
      return 'day.monday.label';
  }
};

export default dayNumberToLabel;
