import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { useNavigate } from "react-router-dom";

const Empty = ({ 
  message = "No items found", 
  description = "Try adjusting your filters or search terms",
  actionLabel = "Browse Products",
  actionPath = "/"
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name="Package" size={40} className="text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{message}</h3>
      <p className="text-gray-500 text-center mb-6 max-w-md">{description}</p>
      <Button onClick={() => navigate(actionPath)} variant="primary">
        <ApperIcon name="ArrowRight" size={18} className="mr-2" />
        {actionLabel}
      </Button>
    </div>
  );
};

export default Empty;