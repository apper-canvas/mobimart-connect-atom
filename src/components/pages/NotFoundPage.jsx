import React from 'react';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const NotFoundPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <ApperIcon name="AlertTriangle" size={48} className="text-white" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-6xl font-bold text-primary">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800">Page Not Found</h2>
            <p className="text-gray-600">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          
          <div className="pt-4">
            <Button
              onClick={() => navigate('/')}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              <ApperIcon name="Home" size={20} className="inline-block mr-2" />
              Go Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;