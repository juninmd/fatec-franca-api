export const parseUnit = (unit?: string) => {
  switch (unit && unit.toLowerCase() || '') {
    case 'days':
    case 'dia':
    case 'dias':
      return 'days';
    case 'semana':
    case 'semanas':
      return 'weeks';
    case 'quinzena':
      return 'fortnight';
    case 'mes':
    case 'meses':
      return 'months';
    default:
      throw new Error(`unit ${unit} not found`);
  }
};