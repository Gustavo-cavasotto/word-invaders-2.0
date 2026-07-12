import { WeaponCard, WeaponCardProps } from "@/components/arsenal/WeaponCard";
import { NavHeader } from "@/components/ui/NavHeader";

const WEAPONS: WeaponCardProps[] = [
  {
    name: "Clássica",
    description: "Dano padrão • Cadência normal • pente 6",
    color: "green",
    equipped: true,
  },
  {
    name: "Metralhadora",
    description: "Dano baixo • Cadência altíssima • pente 24",
    color: "blue",
    price: 10,
  },
  {
    name: "Espingarda",
    description: "Dano em área • Cadência lenta • pente 5",
    color: "orange",
    price: 20,
  },
  {
    name: "Torreta",
    description: "Mira automática • Cadência alta • pente 14",
    color: "pink",
    price: 30,
  },
];

export function ArsenalScreen() {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-space-900">
      <NavHeader title="Arsenal" coins={0} />

      <div className="flex flex-col gap-3 px-4 z-2">
        {WEAPONS.map((weapon) => (
          <WeaponCard key={weapon.name} {...weapon} />
        ))}
      </div>
    </div>
  );
}
