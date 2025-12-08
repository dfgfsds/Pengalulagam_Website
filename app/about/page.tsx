import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('img/la-about-us.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Pengalulagam
          </h1>
          <p className="max-w-3xl text-lg md:text-xl leading-relaxed">
            Pengalulagam is the official super stockist of <b>Femi9 Sanitary Napkins</b> across India.
            Our mission is to create awareness in our society about the hazards of using plastic and
            chemical-based sanitary napkins — and introduce women to 100% organic, chemical-free Femi9
            sanitary napkins for a healthier, safer experience.
          </p>
        </div>
      </div>

      {/* About Section */}
      <div className="py-20 bg-[#F8F7F2]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Founded with a vision for women’s wellness and hygiene, <b>Pengalulagam</b> is one of
              Trichy and Thiruvallur’s most trusted enterprises specializing in eco-friendly and
              chemical-free sanitary napkins. Our company is committed to promoting safe, sustainable,
              and high-quality hygiene products for women.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              With expertise in supplying organic sanitary napkins and creating awareness about the
              hazards of plastic and chemical products, we strive to bring healthier alternatives to
              society. Our mission is simple — <b>Mission Healthy Hygiene</b> — ensuring every product
              we supply is safe, reliable, and eco-conscious.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Since our establishment, <b>Pengalulagam</b> has steadily grown and earned a strong
              reputation in the women’s hygiene industry. We are recognized as reliable stockists and
              suppliers, supporting distributors, retailers, and organizations with authentic products
              that meet both domestic and global standards.
            </p>
          </div>

          {/* Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 text-center">
            {[
              {
                title: "Premium Quality",
                description:
                  "We provide sanitary products made from premium, eco-friendly materials that ensure comfort and health.",
              },
              {
                title: "Reliable Supply",
                description:
                  "Our strong distribution network ensures consistent and timely supply across India.",
              },
              {
                title: "Competitive Pricing",
                description:
                  "We offer affordable prices without compromising on quality, making wellness accessible to everyone.",
              },
              {
                title: "Hygienic Packaging",
                description:
                  "Each product is packed with utmost care, maintaining cleanliness and safety from production to delivery.",
              },
            ].map((value, index) => (
              <div key={index} className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Be a part of our journey toward promoting healthy, organic, and sustainable hygiene
            solutions for women. Together, we can make every period safe and stress-free.
          </p>
          <Button asChild size="lg" className="bg-[#a8822d] hover:bg-[#977526]">
            <Link href="/products">Shop Our Products</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
