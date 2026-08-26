export const navigation = [
  { id: 'perfil', label: 'perfil.md' },
  { id: 'habilidades', label: 'habilidades.json' },
  { id: 'proyectos', label: 'proyectos/' },
  { id: 'educacion', label: 'educacion.md' },
  { id: 'contacto', label: 'contacto.sh' },
];

export const skillGroups = [
  { group: 'frontend', items: ['HTML', 'CSS', 'JavaScript', 'React'] },
  { group: 'datos', items: ['SQL', 'CRUD'] },
  { group: 'versionado', items: ['Git', 'GitHub'] },
  { group: 'herramientas', items: ['Visual Studio Code'] },
  { group: 'integracion', items: ['Consumo de APIs', 'Desarrollo de APIs'] },
];

export const projects = [
  {
    file: 'tecno-sabanas.sys',
    title: 'Sistema de gestión empresarial — Tecno Sábanas',
    description: 'Proyecto de desarrollo de software orientado a la gestión de un negocio de venta y reparación de equipos.',
    tech: ['React', 'JavaScript', 'SQL', 'Git', 'GitHub'],
    bullets: [
      'Interfaces para los distintos módulos del sistema.',
      'Gestión de inventario, ventas y reparaciones.',
      'Integración frontend–backend mediante APIs.',
      'Control de acceso y permisos por tipo de usuario.',
      'Operaciones CRUD sobre bases de datos.',
      'Control de versiones con Git y GitHub.',
    ],
  },
  {
    file: 'proyectos-academicos.log',
    title: 'Proyectos académicos de Ingeniería de Sistemas',
    description: 'Desarrollo de proyectos de programación, bases de datos, lógica computacional y software como parte de la formación universitaria.',
    tech: ['JavaScript', 'Java', 'SQL', 'HTML', 'CSS', 'React'],
    bullets: [
      'Ejercicios de lógica computacional y estructuras de datos.',
      'Modelado y consultas sobre bases de datos relacionales.',
      'Aplicaciones web con distintos stacks académicos.',
    ],
  },
];

export const interests = [
  'Desarrollo web',
  'Frontend',
  'Desarrollo de aplicaciones web',
  'Mantenimiento y mejora de sitios web',
  'Desarrollo de funcionalidades para sistemas existentes',
  'Proyectos freelance',
];
