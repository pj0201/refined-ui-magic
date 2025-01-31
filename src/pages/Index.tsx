import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80")',
            filter: 'brightness(0.7)'
          }}
        />
        <div className="relative z-10 text-center text-white fade-in">
          <h1 className="text-5xl font-bold mb-4">Strategic Consulting Solutions</h1>
          <p className="text-xl max-w-2xl mx-auto">Transforming challenges into opportunities through expert guidance and innovative solutions</p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="fade-in hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="h-48 mb-4 overflow-hidden rounded-t-lg">
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                  alt="Strategic Planning"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle>Strategic Planning</CardTitle>
              <CardDescription>Develop comprehensive strategies for sustainable growth</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Our expert team helps you navigate complex business challenges with data-driven insights.</p>
            </CardContent>
          </Card>

          <Card className="fade-in hover:shadow-lg transition-shadow delay-100">
            <CardHeader>
              <div className="h-48 mb-4 overflow-hidden rounded-t-lg">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" 
                  alt="Data Analytics"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle>Data Analytics</CardTitle>
              <CardDescription>Transform data into actionable insights</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Leverage advanced analytics to make informed decisions and drive business growth.</p>
            </CardContent>
          </Card>

          <Card className="fade-in hover:shadow-lg transition-shadow delay-200">
            <CardHeader>
              <div className="h-48 mb-4 overflow-hidden rounded-t-lg">
                <img 
                  src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952" 
                  alt="Business Transformation"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle>Digital Transformation</CardTitle>
              <CardDescription>Modernize your business operations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Guide your organization through digital transformation with our expertise.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center fade-in">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="mb-8 text-gray-300">Contact us today to schedule a consultation with our experts.</p>
          <button 
            className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            onClick={() => window.location.href = 'mailto:contact@example.com'}
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
};

export default Index;