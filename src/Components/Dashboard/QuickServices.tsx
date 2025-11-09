import { services } from "@/constants/data"
import { ServiceCard, Title } from "../UI"

const QuickServices = () => {
    const quickServices = services.slice(0, 4);
  return (
    <>
    <div className="space-y-4">
        <Title
        title="Quick Services"
        link="/services"
        linkText="View All"
        />
        <div className="grid grid-cols-2 gap-4">
            {quickServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
            ))}
        </div>
    </div>
    </>
  )
}

export default QuickServices