import type { services } from "@/constants/data"
import clsx from "clsx"
import { Link } from "react-router-dom"

const ServiceCard = ({service}: {service: typeof services[0]}) => {
  return (
    <>
    <Link to={service.link} className={clsx("rounded-2xl p-4 border dark:bg-secondary space-y-4 shadow-2xl", service.shadowColor, service.borderColor)}>
        <div className={clsx(service.bgColor, service.textColor, "h-10 w-10 center rounded-lg") }>
            <service.icon size={20} />
        </div>
        <div>
            <h3 className="text-sm font-semibold">{service.name}</h3>
            <p className="text-xs text-muted">{service.description}</p>
        </div>
    </Link>
    </>
  )
}

export default ServiceCard