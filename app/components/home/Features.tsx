const features = [
  {
    name: "Professional Showcase 🌱",
    description:
      "List your services, showcase your expertise, and connect with clients seamlessly on Plantsy. As a professional, build your digital presence, share your skills, and let clients discover the value you bring to the world of agriculture and gardening.",
  },
  {
    name: "Client Discovery 🔍",
    description:
      "Discover professionals, hire experts, and cultivate your projects effortlessly. Whether you need a seasoned farmer or a skilled gardener, Plantsy connects you with the right professionals for your unique needs. Your green dreams are just a click away from becoming a reality.",
  },
  {
    name: "Pioneer's Pride 🚀",
    description:
      "Be the first to join Plantsy and become part of a pioneering community that's transforming the landscape of agriculture and green innovation. Embrace the opportunity to shape the future of Plantsy and experience the exclusive benefits of being at the forefront of a groundbreaking platform.",
  },
];

export default function Features() {
  return (
    <div className="w-full py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Cultivate Connections, Your Way
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Discover a new era in agriculture with Plantsy. Connect with a
            diverse community of professionals, offering a range of services to
            meet your unique needs. From agricultural experts to gardening
            enthusiasts, Plantsy empowers you to find and work with the best in
            the field. Join the movement, where every connection is an
            opportunity to grow.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  {feature.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
