const ProjectDescriptionCard = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-5xl align font-bold text-gray-600 mb-4">
        {'The first in the world to pay your debts to me via crypto'.toUpperCase()}
      </h2>
      <p className="text-lg text-gray-600 leading-relaxed">
        Our project marks a groundbreaking milestone in the realm of debt
        settlement by introducing the world`s first platform where individuals
        can settle their debts using cryptocurrency. We recognize the growing
        influence of blockchain technology and its potential to transform
        traditional financial processes. Leveraging this innovative technology,
        we offer a secure, transparent, and efficient solution for debt
        repayment.
      </p>
      <button className="rounded-xl bg-opacity-80 backdrop-blur-md mt-4 py-3 px-4 bg-cyan-600">
        Learn more
      </button>
      {/* <p className="text-lg text-gray-600 leading-relaxed mt-4">
        As an ERC-20 token built on the Ethereum blockchain, the CryptoDZ Token offers fast and secure transactions,
        low fees, and interoperability with other decentralized applications (DApps) and exchanges in the Ethereum
        ecosystem.
      </p> */}
    </div>
  )
}

export default ProjectDescriptionCard
