export default function Banner() {
  return (
    <div className="flex items-center justify-center bg-gray-900 px-6 py-2.5 sm:px-3.5">
      <p className="text-sm text-center leading-6 text-white">
        <a href="#">
          <strong className="font-semibold">Plantsy inc</strong>
          <svg
            viewBox="0 0 2 2"
            className="mx-2 inline h-0.5 w-0.5 fill-current"
            aria-hidden="true"
          >
            <circle cx={1} cy={1} r={1} />
          </svg>
          Registrations are open, be the first to join!
        </a>
      </p>
    </div>
  );
}
