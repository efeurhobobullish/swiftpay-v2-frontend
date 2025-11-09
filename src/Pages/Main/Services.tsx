import { ServiceCard } from "@/Components/UI"
import { services } from "@/constants/data"
import { DashboardLayout } from "@/Layout"

const Services = () => {
  return (
    <DashboardLayout title="Services">
 <div className="grid grid-cols-2 gap-4">
            {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
            ))}
        </div>
    </DashboardLayout>
  )
}

export default Services