import { Star } from 'lucide-react';
import { getReviews } from '@/lib/data';

export default function CustomerReviews() {
  const reviews = getReviews();
  
  return (
    <section className="py-20 bg-cusBgImage">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from people who have made the switch to sustainable living with our products.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-white p-6 rounded-xl shadow-sm relative"
            >
              <div className="flex items-center mb-4">
                {/* <img 
                  src={review.avatar} 
                  alt={review.user} 
                  className="w-10 h-10 rounded-full mr-3"
                /> */}
                <div>
                  <h4 className="font-medium">{review.user}</h4>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground text-sm mb-2">{review.comment}</p>
              <p className="text-xs text-muted-foreground">{review.date}</p>
              
              <div className="absolute top-2 right-2 opacity-10">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.17 14.83L14.83 9.17M14.83 14.83L9.17 9.17M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="#a8822d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}