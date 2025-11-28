import logo from 'figma:asset/8f51625c5ca59940f6672c548e557e64eed153aa.png';

export function ContactInfo() {
  return (
    <div className="pl-[6px] pr-[6px] pt-8 pb-[6px] fixed bottom-0 right-0 w-1/4 flex justify-between items-end">
      <div>
        <p>Coupure Links 261</p>
        <p>9000 Gent</p>
        <p>België</p>
        <p>+32 497 47 11 04</p>
        <p>info@madoc.be</p>
      </div>
      <img src={logo} alt="Madoc logo" className="h-16" />
    </div>
  );
}
