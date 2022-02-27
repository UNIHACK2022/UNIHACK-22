import React, { useEffect } from "react";
import {
  MathOperations,
  BookOpen,
  Lightning,
  CarSimple,
  ArrowRight,
} from "phosphor-react";
import { useState } from "react";
import SolarCalculator from "./SolarCalculator";
import EVCalculator from "./EVCalculator";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";

export default function HomeCard() {
  const [solarVisible, setSolarVisible] = React.useState(false);
  const [electricVisible, setElectricVisible] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const solarOpen = () => {
    setSolarVisible(true);
  };

  const solarClose = () => {
    setSolarVisible(false);
  };

  const electricOpen = () => {
    setElectricVisible(true);
  };

  const electricClose = () => {
    setElectricVisible(false);
  };

  return (
    <div className="absolute flex flex-col z-30 left-[1.5rem] top-16 content-start gap-4">
      {solarVisible === true && <SolarCalculator close={solarClose} />}
      {electricVisible === true && <EVCalculator close={electricClose} />}
      <div className="flex flex-col content-start px-6 py-6 bg-white rounded-lg w-96 h-max drop-shadow">
        <h1 className="pb-2 text-xl font-semibold">
          How green&apos;s your suburb?
        </h1>
        <p className="pb-4">
          Fighting climate change starts with reducing our carbon footprint -
          the amount of carbon we release into the atmosphere - on a community
          level.
        </p>
        <p className="">See how your suburb stacks up to others.</p>
        <div className="h-full px-3 py-2 mt-4 rounded-md bg-emerald-100 w-max">
          <p className="text-sm font-medium text-emerald-900">
            💡&nbsp;Tip: Try clicking on map layers!
          </p>
        </div>
      </div>

      <div className="flex flex-col content-start px-6 py-6 bg-white rounded-lg w-96 h-max drop-shadow">
        <h1 className="pb-2 text-xl font-semibold">
          You can help fight climate change
        </h1>
        <p className="">
          The choices you make everyday contribute to your carbon footprint. You
          can reduce yours by making small changes. And if we do it together,
          it’ll compound into massive change.
        </p>
        <div className="mb-4 border-t mt-7 border-neutral-300" />
        <div className="flex flex-col items-start">
          <div className="flex flex-row items-center gap-2 pb-2 text-neutral-800">
            <MathOperations size={18} weight="fill" />
            <p className="text-base font-medium">Calculators</p>
          </div>
          <div className="flex flex-col gap-1">
            <button
              className="flex flex-row items-center gap-2 text-sm"
              onClick={solarOpen}
            >
              <Lightning size={14} weight="fill" className="text-yellow-500" />
              <p className="transition-all hover:text-green-900">
                Solar Panel Savings
              </p>
            </button>
            <button
              className="flex flex-row items-center gap-2 text-sm"
              onClick={electricOpen}
            >
              <CarSimple size={14} weight="fill" className="text-red-500" />
              <p className="transition-all hover:text-green-900">
                Electric Car Savings
              </p>
            </button>
          </div>

          <div className="flex flex-row items-center gap-2 pt-3 pb-2">
            <BookOpen size={18} weight="fill" />
            <p className="text-base font-medium">Guides</p>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Credits / Data Sources</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h1 className="pb-4 text-lg font-medium">Team members</h1>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Role</Th>
                  <Th>GitHub</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Jeffrey Yao</Td>
                  <Td>Lead Developer + UI/UX Designer</Td>
                  <Td>
                    <a
                      href="https://github.com/jeffreydyao"
                      className="transition-all hover:text-green-700"
                    >
                      jeffreydyao
                    </a>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Luke Prior</Td>
                  <Td>Lead Data Analyst + Developer</Td>
                  <Td>
                    <a
                      href="https://github.com/LukePrior"
                      className="transition-all hover:text-green-700"
                    >
                      LukePrior
                    </a>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Tiffany Nguyen</Td>
                  <Td>Lead Pitcher + Analyst</Td>
                  <Td>
                    <a
                      href="https://github.com/tiffnma"
                      className="transition-all hover:text-green-700"
                    >
                      tiffnma
                    </a>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Terence Lau</Td>
                  <Td>Pitcher</Td>
                  <Td>
                    <a
                      href="https://github.com/Laute"
                      className="transition-all hover:text-green-700"
                    >
                      Laute
                    </a>
                  </Td>
                </Tr>
              </Tbody>
            </Table>

            <h1 className="pt-6 pb-4 text-lg font-medium">Tech stack</h1>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Part</Th>
                  <Th>Technologies</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Hosting</Td>
                  <Td>Vercel, PlanetScale</Td>
                </Tr>
                <Tr>
                  <Td>Front-end</Td>
                  <Td>Next.js, React</Td>
                </Tr>
                <Tr>
                  <Td>Libraries/Frameworks</Td>
                  <Td>Mapbox GL JS, Chakra UI, Tailwind CSS</Td>
                </Tr>
                <Tr>
                  <Td>Back-end</Td>
                  <Td>JavaScript/TypeScript</Td>
                </Tr>
                <Tr>
                  <Td>Databases</Td>
                  <Td>MySQL</Td>
                </Tr>
              </Tbody>
            </Table>

            <h1 className="pt-6 pb-4 text-lg font-medium">Data sources</h1>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Source</Th>
                  <Th>Link</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Australian Building Code Board</Td>
                  <Td><a href="https://www.abcb.gov.au/sites/default/files/resources/2020//ClimateZoneMapAUST.pdf" className="transition-all hover:text-green-700"><ArrowRight size={16} weight="regular" /></a></Td>
                </Tr>
                <Tr>
                  <Td>Australian Bureau of Statistics</Td>
                  <Td><a href="https://www.abs.gov.au/statistics/standards/australian-statistical-geography-standard-asgs-edition-3/jul2021-jun2026" className="transition-all hover:text-green-700"><ArrowRight size={16} weight="regular" /></a></Td>
                </Tr>
                <Tr>
                  <Td>Australian Energy Regulator</Td>
                  <Td><a href="https://www.aer.gov.au/system/files/Residential%20energy%20consumption%20benchmarks%20-%209%20December%202020_0.pdf" className="transition-all hover:text-green-700"><ArrowRight size={16} weight="regular" /></a></Td>
                </Tr>
                <Tr>
                  <Td>Australian PV Institute</Td>
                  <Td><a href="https://pv-map.apvi.org.au/postcode" className="transition-all hover:text-green-700"><ArrowRight size={16} weight="regular" /></a></Td>
                </Tr>
                <Tr>
                  <Td>electricityMap</Td>
                  <Td><a href="https://app.electricitymap.org/map" className="transition-all hover:text-green-700"><ArrowRight size={16} weight="regular" /></a></Td>
                </Tr>
                <Tr>
                  <Td>EPA Fuel Economy</Td>
                  <Td><a href="https://en.wikipedia.org/wiki/Electric_car_EPA_fuel_economy" className="transition-all hover:text-green-700"><ArrowRight size={16} weight="regular" /></a></Td>
                </Tr>
                <Tr>
                  <Td>NatHERS</Td>
                  <Td><a href="https://www.nathers.gov.au/node/472" className="transition-all hover:text-green-700"><ArrowRight size={16} weight="regular" /></a></Td>
                </Tr>
                <Tr>
                  <Td>OpenNEM</Td>
                  <Td><a href="https://opennem.org.au/" className="transition-all hover:text-green-700"><ArrowRight size={16} weight="regular" /></a></Td>
                </Tr>
                <Tr>
                  <Td>SolarEdge</Td>
                  <Td><a href="https://www.solaredge.com/sites/default/files/monitoring_platform_environmental_benefits_calculation.pdf" className="transition-all hover:text-green-700"><ArrowRight size={16} weight="regular" /></a></Td>
                </Tr>
                <Tr>
                  <Td>2021 Lowy Institute Climate Poll</Td>
                  <Td><a href="https://www.lowyinstitute.org/publications/climatepoll-2021" className="transition-all hover:text-green-700"><ArrowRight size={16} weight="regular" /></a></Td>
                </Tr>
                <Tr>
                  <Td>2021 Australia Government “Australia’s Long Term Emissions Reduction Plan” Report</Td>
                  <Td><a href="https://www.industry.gov.au/sites/default/files/October%202021/document/australias-long-term-emissions-reduction-plan.pdf" className="transition-all hover:text-green-700"><ArrowRight size={16} weight="regular" /></a></Td>
                </Tr>
                <Tr>
                  <Td>2019 Australian Institute's Climate of the Nation” Report </Td>
                  <Td><a href="​​https://australiainstitute.org.au/wp-content/uploads/2020/12/Climate-of-the-Nation-2019-WEB.pdf" className="transition-all hover:text-green-700"><ArrowRight size={16} weight="regular" /></a></Td>
                </Tr>
              </Tbody>
            </Table>
          </ModalBody>



          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost"><a href="https://github.com/UNIHACK2022/UNIHACK-22"> View GitHub</a></Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <div className="flex flex-col content-start px-6 py-6 bg-white rounded-lg w-96 h-max drop-shadow">
        <h1 className="pb-2 text-lg font-semibold leading-7">
          Empowering individuals, communities and governments to visualise and
          accelerate their progress towards stopping climate change.
        </h1>

        <div className="flex flex-col gap-1">
          <button
            className="flex flex-row items-center gap-1 hover:text-green-900"
            onClick={onOpen}
          >
            <p className="text-sm font-medium transition-all">
              Credits / Data Sources
            </p>
            <ArrowRight size={14} weight="bold" />
          </button>

          <button className="flex flex-row items-center gap-1 hover:text-green-900">
            <p className="text-sm font-medium transition-all">GitHub</p>
            <ArrowRight size={14} weight="bold" />
          </button>
        </div>

        <p className="pb-2">Greenway logo here</p>
        <p className="text-sm text-neutral-500">
          Made with <span className="text-red-700">♥</span> by Luke, Tiff,
          Terrie, Jeff and Ayush at UNIHACK ‘22 in Sydney.
        </p>
      </div>
    </div>
  );
}
