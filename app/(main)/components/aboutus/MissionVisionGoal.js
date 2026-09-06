import { Compass, Eye, Flag } from "lucide-react";

const iconMap = {
  compass: Compass,
  eye: Eye,
  flag: Flag,
}



export default function MissionVisionGoal({ data }) {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
      <div className="grid md:grid-cols-3 gap-6">
    
        {data.items.map((item) => {

          const Icon = iconMap[item.icon] || Compass;

          return (<div key={item.id} className={`border  rounded-xl p-7 text-text-secondary bg-secondary-light`}>
            <Icon size={26} />
            <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm text-text leading-relaxed">
              {item.description}
            </p>
          </div>)
        })}

      </div>
    </section>
  );
}
