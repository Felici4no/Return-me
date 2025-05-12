import {
    GiChemicalDrop,
    GiDiploma,
    GiTrophyCup,
    GiStarMedal,
    GiBookCover,
    GiMagicHat,
    GiBriefcase,
    GiLaurels,
    GiGreekTemple,
    GiCoffeeCup
  } from 'react-icons/gi';
  
  type EmblemaProps = {
    resultado: string;
    className?: string;
  };
  
  const Emblema = ({ resultado, className }: EmblemaProps) => {
    const configEmblemas = {
      // Já existentes
      'Walter White': {
        Icone: GiChemicalDrop,
        corFundo: 'bg-blue-100',
        corIcone: 'text-blue-600',
        borda: 'border-blue-200'
      },
      'Diplomata': {
        Icone: GiDiploma,
        corFundo: 'bg-emerald-100',
        corIcone: 'text-emerald-600',
        borda: 'border-emerald-200'
      },
      'Cientista': {
        Icone: GiBookCover,
        corFundo: 'bg-amber-100',
        corIcone: 'text-amber-600',
        borda: 'border-amber-200'
      },
      'Líder': {
        Icone: GiStarMedal,
        corFundo: 'bg-purple-100',
        corIcone: 'text-purple-600',
        borda: 'border-purple-200'
      },
  
      // Novos temas
      'Harry Potter': {
        Icone: GiMagicHat,
        corFundo: 'bg-indigo-100',
        corIcone: 'text-indigo-600',
        borda: 'border-indigo-200'
      },
      'How I Met Your Mother': {
        Icone: GiBriefcase,
        corFundo: 'bg-yellow-100',
        corIcone: 'text-yellow-600',
        borda: 'border-yellow-200'
      },
      'Candidato 2022': {
        Icone: GiLaurels,
        corFundo: 'bg-red-100',
        corIcone: 'text-red-600',
        borda: 'border-red-200'
      },
      'Imperador Romano': {
        Icone: GiGreekTemple,
        corFundo: 'bg-orange-100',
        corIcone: 'text-orange-600',
        borda: 'border-orange-200'
      },
      'Xícara de Café': {
        Icone: GiCoffeeCup,
        corFundo: 'bg-brown-100',
        corIcone: 'text-brown-600',
        borda: 'border-brown-200'
      }
    };
  
    const emblema = configEmblemas[resultado as keyof typeof configEmblemas] || {
      Icone: GiTrophyCup,
      corFundo: 'bg-gray-100',
      corIcone: 'text-gray-600',
      borda: 'border-gray-200'
    };
  
    return (
      <div 
        className={`${emblema.corFundo} ${emblema.borda} ${className} 
          p-3 rounded-full border-2 flex items-center justify-center
          transition-all hover:scale-105 hover:shadow-sm`}
      >
        <emblema.Icone className={`${emblema.corIcone} w-8 h-8 md:w-10 md:h-10`} />
      </div>
    );
  };
  
  export default Emblema;
  