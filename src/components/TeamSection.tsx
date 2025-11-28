import image_700443aea8012441d20c6c5f9002bc3a295ec437 from 'figma:asset/700443aea8012441d20c6c5f9002bc3a295ec437.png';
import image_bc5d035b0ee3007d3a8f16688c06dd2de4429a7d from 'figma:asset/bc5d035b0ee3007d3a8f16688c06dd2de4429a7d.png';
import { ImageWithFallback } from './figma/ImageWithFallback';

const coreTeam = [
  {
    id: 1,
    name: 'Benny Kerkhof',
    role: 'Storyteller & zaakvoerder',
    image: image_bc5d035b0ee3007d3a8f16688c06dd2de4429a7d,
  },
  {
    id: 2,
    name: 'Lulu Cuyvers',
    role: 'Scenograaf',
    image: image_700443aea8012441d20c6c5f9002bc3a295ec437,
  },
];

const collaborators = [
  { name: 'Astrid Fieuws', specialty: 'Grafische vormgeving' },
  { name: 'Bert Vanwijnsberghe', specialty: 'Beeldhouwwerk' },
  { name: 'Bruns', specialty: 'Museale constructie' },
  { name: 'Create', specialty: 'Multimediale toepassingen' },
  { name: 'Danse la Pluie', specialty: 'Multimediale content' },
  { name: 'Geert Verscheure', specialty: 'Illustratie' },
  { name: 'Gino Bulcke', specialty: 'Soclage' },
  { name: 'Heyvaert Jansen', specialty: 'Redactie' },
  { name: 'Ineke Wellens', specialty: 'Educatieve redactie' },
  { name: 'Kim Beirnaert', specialty: 'Grafische vormgeving' },
  { name: 'Koen Landuyt', specialty: 'Grafische vormgeving' },
  { name: 'Koen Bruyneel', specialty: 'Grafische vormgeving' },
  { name: 'Lena Nerinckx', specialty: 'Motion design' },
  { name: 'Mikélé', specialty: 'Animatie' },
  { name: 'Ocular', specialty: 'Multimediale toepassingen' },
  { name: 'Philippe Vandorpe', specialty: 'Schrijnwerk' },
  { name: 'Plug&Play', specialty: 'Museale constructie' },
  { name: 'Potteau', specialty: 'Museale constructie' },
  { name: 'Tinel', specialty: 'Metaalwerk' },
  { name: 'Tja Ling', specialty: 'Illustratie' },
];

export function TeamSection() {
  return (
    <section className="col-start-2 col-span-2 pl-[6px] pr-[6px] pt-0 pb-8">
      <h2 className="mb-6">Team</h2>
      
      {/* Core team members */}
      <div className="grid grid-cols-2 gap-[6px] mb-12">
        {coreTeam.map((member) => (
          <div key={member.id}>
            <div className="mb-2 grayscale">
              <ImageWithFallback
                src={member.image}
                alt={member.name}
                className="w-full h-auto"
              />
            </div>
            <p className="mb-0 text-[20px]">{member.name}</p>
            <p className="mt-0" style={{ fontFamily: 'Times, Times New Roman, serif', fontStyle: 'italic', fontSize: '15px' }}>{member.role}</p>
          </div>
        ))}
      </div>

      {/* Collaborators section */}
      <div>
        <h3 className="mb-4">Creatieve samenwerkingen</h3>
        <div className="grid grid-cols-2 gap-x-[6px]">
          {collaborators.map((collab, index) => (
            <p key={index} className="my-0">
              {collab.name} <i style={{ fontFamily: 'Times New Roman, serif', fontSize: '15px', fontStyle: 'italic' }}>{collab.specialty}</i>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
