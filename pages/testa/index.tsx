import React, { useState } from 'react'
import loginLayoutStyles from '@/styles/layouts/Login.module.scss'
import { Formik } from 'formik'
import Head from 'next/head'
import { useAuthenticate } from '../../contexts/useAuthenticate'
import Link from 'next/link'
import textLinkStyles from '@/styles/components/TextLink.module.scss'
import authFormStyles from '@/styles/components/AuthForm.module.scss'
import { emailSchema } from '../../utils/validation/schema'

const ForgotPassword: React.FC = () => {
  const { updateEmail } = useAuthenticate()
  const [sent, setSent] = useState(false)
  return (
    <div className="Desktop w-[1280px] h-[6314px] relative bg-white flow-hidden">
      <div className="Ellipse24 w-[500px] h-[500px] left-[1351px] top-[847px] absolute opacity-50 bg-amber-300 rounded-full blur-[500px]" />
      <div className="Objects w-[65px] h-[169.95px] left-[103px] top-[1011.95px] absolute origin-top-left rotate-180">
        <div className="Group w-[20.97px] left-0 top-0 absolute"></div>
        <div className="Group w-[20.97px] left-[44.03px] top-[17.28px] absolute"></div>
      </div>
      <div className="Frame80 w-[1184px] py-8 left-[128px] top-0 absolute justify-between items-center inline-flex">
        <div className="Frame1 justify-start items-center gap-4 flex">
          <div className="Travlog text-gray-900 text-2xl font-black font-['Circular Std'] leading-10">
            Travlog
          </div>
        </div>
        <div className="Frame5 justify-start items-start gap-16 flex">
          <div className="Home text-gray-800 text-sm font-bold font-['Circular Std'] leading-[16.80px]">
            Home
          </div>
          <div className="Discover text-gray-900 text-opacity-50 text-sm font-bold font-['Circular Std'] leading-[16.80px]">
            Discover
          </div>
          <div className="SpecialDeals text-gray-900 text-opacity-50 text-sm font-bold font-['Circular Std'] leading-[16.80px]">
            Special Deals
          </div>
          <div className="Contact text-gray-900 text-opacity-50 text-sm font-bold font-['Circular Std'] leading-[16.80px]">
            Contact
          </div>
        </div>
        <div className="Frame8 justify-start items-start flex">
          <div className="Frame6 px-8 py-4 bg-white rounded-[100px] justify-start items-start gap-2 flex">
            <div className="LogIn text-gray-800 text-sm font-bold font-['Circular Std'] leading-[16.80px]">
              Log In
            </div>
          </div>
          <div className="Frame7 px-8 py-4 bg-indigo-600 rounded-[100px] justify-start items-start gap-2 flex">
            <div className="SignUp text-zinc-100 text-sm font-bold font-['Circular Std'] leading-[16.80px]">
              Sign Up
            </div>
          </div>
        </div>
      </div>
      <div className="Frame82 w-[1184px] py-16 left-[128px] top-[113px] absolute justify-start items-center inline-flex">
        <div className="Frame81 grow shrink basis-0 flex-col justify-start items-start gap-[43px] inline-flex">
          <div className="Frame10 px-8 py-4 bg-white rounded-[100px] shadow justify-start items-center gap-4 inline-flex">
            <div className="ExploreTheWorld text-pink-500 text-sm font-bold font-['Circular Std'] leading-[16.80px]">
              Explore the world!
            </div>
            <div className="Work1 w-6 h-6 relative" />
          </div>
          <div className="TravelTopDestinationOfTheWorld self-stretch">
            <span className="text-black text-[69px] font-bold font-['Circular Std'] leading-[82.80px]">
              Travel{' '}
            </span>
            <span className="text-pink-500 text-[69px] font-bold font-['Circular Std'] leading-[82.80px]">
              top destination
            </span>
            <span className="text-black text-[69px] font-bold font-['Circular Std'] leading-[82.80px]">
              {' '}
              <br />
              of the world
            </span>
          </div>
          <div className="WeAlwaysMakeOurCustomerHappyByProvidingAsManyChoicesAsPossible self-stretch text-gray-900 text-opacity-50 text-lg font-normal font-['Inter'] leading-[28.80px]">
            We always make our customer happy by providing
            <br />
            as many choices as possible{' '}
          </div>
          <div className="Frame8 justify-start items-start gap-4 inline-flex">
            <div className="Frame7 px-8 py-4 bg-indigo-600 rounded-[100px] shadow justify-start items-start gap-2 flex">
              <div className="GetStarted text-zinc-100 text-sm font-bold font-['Circular Std'] leading-[16.80px]">
                Get Started
              </div>
            </div>
            <div className="Frame6 px-8 py-4 bg-white rounded-[100px] border border-zinc-100 justify-start items-center gap-2 flex">
              <div className="PlayCircle51 w-6 h-6 relative" />
              <div className="WatchDemo text-gray-800 text-sm font-bold font-['Circular Std'] leading-[16.80px]">
                Watch Demo
              </div>
            </div>
          </div>
        </div>
        <div className="Group1 w-[772px] h-[713px] relative">
          <div className="Layer w-[772px] h-[287.38px] left-0 top-0 absolute" />
          <div className="Frame15 w-[575px] h-[632px] left-[91px] top-[75px] absolute justify-start items-center gap-[31px] inline-flex">
            <div className="Frame14 flex-col justify-start items-start gap-8 inline-flex">
              <img
                className="Rectangle1 w-[272px] h-[300px] rounded-[32px]"
                src="https://via.placeholder.com/272x300"
              />
              <img
                className="Rectangle2 w-[272px] h-[300px] rounded-[32px]"
                src="https://via.placeholder.com/272x300"
              />
            </div>
            <img
              className="Rectangle3 w-[272px] h-[400px] rounded-[32px]"
              src="https://via.placeholder.com/272x400"
            />
          </div>
          <div className="Frame16 w-16 h-16 p-4 left-[56px] top-[341px] absolute bg-pink-500 rounded-[100px] shadow justify-start items-start gap-2 inline-flex">
            <div className="Send1 w-8 h-8 relative" />
          </div>
          <div className="Frame17 w-16 h-16 p-4 left-[474px] top-[649px] absolute bg-orange-600 rounded-[100px] shadow justify-start items-start gap-2 inline-flex">
            <div className="AddUser1 w-8 h-8 relative" />
          </div>
          <div className="Frame18 w-[166px] h-14 px-8 py-4 left-[592px] top-[488px] absolute bg-white rounded-[100px] shadow justify-start items-center gap-2 inline-flex">
            <div className="Location1 w-6 h-6 relative" />
            <div className="TopPlaces text-zinc-700 text-sm font-bold font-['Circular Std'] leading-[16.80px]">
              Top Places
            </div>
          </div>
        </div>
      </div>
      <div className="Frame85 w-[1184px] py-16 left-[128px] top-[954px] absolute justify-between items-start inline-flex">
        <div className="Group w-[211.83px] h-8 relative">
          <div className="Owl w-[42.35px] h-[25.10px] left-0 top-[1.44px] absolute"></div>
          <div className="Group w-[48.88px] h-[30.92px] left-[48.31px] top-[1.08px] absolute"></div>
          <div className="Group w-[103.23px] h-[25.48px] left-[99.52px] top-0 absolute"></div>
        </div>
        <div className="Group2 w-[113.06px] h-8 relative"></div>
        <div className="Group w-[188.60px] h-8 relative">
          <div className="ClipPathGroup w-[188.60px] h-8 left-0 top-0 absolute">
            <div className="Group w-[188.60px] h-8 left-0 top-0 absolute">
              <div className="ClipPathGroup w-[188.60px] h-8 left-0 top-0 absolute"></div>
              <div className="ClipPathGroup w-[188.60px] h-8 left-0 top-0 absolute"></div>
              <div className="ClipPathGroup w-[188.60px] h-8 left-0 top-0 absolute"></div>
            </div>
          </div>
          <div className="ClipPathGroup w-[188.60px] h-8 left-0 top-0 absolute">
            <div className="ClipPathGroup w-[188.56px] h-[31.33px] left-0 top-[0.63px] absolute">
              <div className="Group w-[188.60px] h-8 left-0 top-[-0.63px] absolute">
                <div className="ClipPathGroup w-[188.60px] h-8 left-0 top-0 absolute"></div>
                <div className="ClipPathGroup w-[188.60px] h-8 left-0 top-0 absolute"></div>
              </div>
            </div>
          </div>
          <div className="ClipPathGroup w-[188.60px] h-8 left-0 top-0 absolute">
            <div className="Group w-[188.60px] h-8 left-0 top-0 absolute">
              <div className="ClipPathGroup w-[188.60px] h-8 left-0 top-0 absolute"></div>
              <div className="ClipPathGroup w-[188.60px] h-8 left-0 top-0 absolute"></div>
            </div>
          </div>
        </div>
        <div className="Group3 w-[173.57px] h-8 relative"></div>
      </div>
      <div className="Frame89 w-[1536px] py-16 left-[128px] top-[1114px] absolute justify-start items-center inline-flex">
        <div className="Frame22 grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex">
          <div className="Services self-stretch text-pink-500 text-[23px] font-bold font-['Circular Std'] uppercase leading-7 tracking-[4.60px]">
            Services
          </div>
          <div className="OurTopValueCategoriesForYou self-stretch text-gray-900 text-[44px] font-bold font-['Circular Std'] leading-[52.80px]">
            Our top value categories for you
          </div>
        </div>
        <div className="Frame88 h-[443px] justify-start items-start gap-[21px] flex">
          <div className="Frame23 grow shrink basis-0 h-[443px] p-16 bg-white rounded-[32px] border border-gray-900 border-opacity-10 flex-col justify-start items-center gap-16 inline-flex">
            <img
              className="Destination1 w-16 h-16"
              src="https://via.placeholder.com/64x64"
            />
            <div className="Frame24 self-stretch h-[153px] flex-col justify-start items-center gap-8 flex">
              <div className="BestTourGuide self-stretch text-center text-gray-900 text-[28px] font-bold font-['Circular Std'] leading-[33.60px]">
                Best Tour Guide
              </div>
              <div className="WhatLookedLikeASmallPatchOfPurpleGrassAboveFiveFeet self-stretch text-center text-gray-900 text-opacity-50 text-lg font-normal font-['Inter'] leading-[28.80px]">
                What looked like a small patch of purple grass, above five feet.
              </div>
            </div>
          </div>
          <div className="Frame24 grow shrink basis-0 h-[443px] p-16 bg-white rounded-[32px] shadow flex-col justify-start items-center gap-16 inline-flex">
            <img
              className="Booking1 w-16 h-16"
              src="https://via.placeholder.com/64x64"
            />
            <div className="Frame24 self-stretch h-[153px] flex-col justify-start items-center gap-8 flex">
              <div className="EasyBooking self-stretch text-center text-gray-900 text-[28px] font-bold font-['Circular Std'] leading-[33.60px]">
                Easy Booking
              </div>
              <div className="SquareWasMovingAcrossTheSandInTheirDirection self-stretch text-center text-gray-900 text-opacity-50 text-lg font-normal font-['Inter'] leading-[28.80px]">
                Square, was moving across the sand in their direction.
              </div>
            </div>
          </div>
          <div className="Frame25 grow shrink basis-0 h-[443px] p-16 bg-white rounded-[32px] border border-gray-900 border-opacity-10 flex-col justify-start items-center gap-16 inline-flex">
            <img
              className="Cloudy1 w-16 h-16"
              src="https://via.placeholder.com/64x64"
            />
            <div className="Frame24 self-stretch h-[187px] flex-col justify-start items-center gap-8 flex">
              <div className="WeatherForecast self-stretch text-center text-gray-900 text-[28px] font-bold font-['Circular Std'] leading-[33.60px]">
                Weather Forecast
              </div>
              <div className="WhatLookedLikeASmallPatchOfPurpleGrassAboveFiveFeet self-stretch text-center text-gray-900 text-opacity-50 text-lg font-normal font-['Inter'] leading-[28.80px]">
                What looked like a small patch of purple grass, above five feet.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Frame109 h-[867px] py-16 left-[128px] top-[1685px] absolute flex-col justify-start items-start gap-16 inline-flex">
        <div className="Frame90 self-stretch justify-start items-center inline-flex">
          <div className="Frame22 grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex">
            <div className="TopDestination self-stretch text-pink-500 text-[23px] font-bold font-['Circular Std'] uppercase leading-7 tracking-[4.60px]">
              Top Destination
            </div>
            <div className="ExploreTopDestination self-stretch text-gray-900 text-[44px] font-bold font-['Circular Std'] leading-[52.80px]">
              Explore top destination
            </div>
          </div>
          <div className="Frame28 justify-start items-start gap-8 flex">
            <div className="Group9237 w-[100px] h-[100px] relative">
              <div className="Rectangle4 w-[100px] h-[100px] left-0 top-0 absolute bg-white rounded-[100px] border border-gray-900 border-opacity-10" />
              <div className="ArrowLeft1 w-6 h-6 left-[38px] top-[38px] absolute" />
            </div>
            <div className="Group9236 w-[100px] h-[100px] relative">
              <div className="Rectangle5 w-[100px] h-[100px] left-[100px] top-0 absolute origin-top-left rotate-180 bg-indigo-600 rounded-[100px]" />
              <div className="ArrowLeft2 w-6 h-6 left-[62px] top-[38px] absolute origin-top-left rotate-180" />
            </div>
          </div>
        </div>
        <div className="Frame91 self-stretch justify-start items-start gap-8 inline-flex">
          <div className="Frame33 grow shrink basis-0 h-[575px] flex-col justify-start items-start inline-flex">
            <img
              className="Rectangle6 self-stretch grow shrink basis-0 rounded-tl-[32px] rounded-tr-[32px]"
              src="https://via.placeholder.com/373x350"
            />
            <div className="Frame31 self-stretch h-[225px] p-8 bg-white rounded-bl-[32px] rounded-br-[32px] shadow flex-col justify-start items-start gap-8 flex">
              <div className="Frame36 self-stretch h-[101px] flex-col justify-start items-start gap-4 flex">
                <div className="Frame32 self-stretch justify-start items-start inline-flex">
                  <div className="ParadiseBeachBantayanIsland grow shrink basis-0 text-gray-900 text-[23px] font-bold font-['Circular Std'] leading-7">
                    Paradise Beach, Bantayan Island
                  </div>
                  <div className="55016 text-pink-500 text-[23px] font-bold font-['Circular Std'] leading-7">
                    $550.16
                  </div>
                </div>
                <div className="RomeItaly self-stretch text-gray-900 text-opacity-75 text-lg font-normal font-['Inter'] leading-[28.80px]">
                  Rome, Italy
                </div>
              </div>
              <div className="Frame30 justify-start items-center gap-2 inline-flex">
                <div className="8 text-orange-600 text-[23px] font-bold font-['Circular Std'] leading-7">
                  4.8
                </div>
                <div className="Star1 w-6 h-6 relative" />
              </div>
            </div>
          </div>
          <div className="Frame34 grow shrink basis-0 h-[575px] flex-col justify-start items-start inline-flex">
            <div className="Frame31 self-stretch h-[225px] p-8 bg-white rounded-bl-[32px] rounded-br-[32px] shadow flex-col justify-start items-start gap-8 flex">
              <div className="Frame37 self-stretch h-[101px] flex-col justify-start items-start gap-4 flex">
                <div className="Frame32 self-stretch justify-start items-start inline-flex">
                  <div className="OceanWithFullOfColors grow shrink basis-0 text-gray-900 text-[23px] font-bold font-['Circular Std'] leading-7">
                    Ocean with full of Colors
                  </div>
                  <div className="2099 text-pink-500 text-[23px] font-bold font-['Circular Std'] leading-7">
                    $20.99
                  </div>
                </div>
                <div className="Maldives self-stretch text-gray-900 text-opacity-75 text-lg font-normal font-['Inter'] leading-[28.80px]">
                  Maldives
                </div>
              </div>
              <div className="Frame30 justify-start items-center gap-2 inline-flex">
                <div className="5 text-orange-600 text-[23px] font-bold font-['Circular Std'] leading-7">
                  4.5
                </div>
                <div className="Star1 w-6 h-6 relative" />
              </div>
            </div>
          </div>
          <div className="Frame35 grow shrink basis-0 h-[575px] flex-col justify-start items-start inline-flex">
            <img
              className="Rectangle6 self-stretch grow shrink basis-0 rounded-tl-[32px] rounded-tr-[32px]"
              src="https://via.placeholder.com/373x350"
            />
            <div className="Frame31 self-stretch h-[225px] p-8 bg-white rounded-bl-[32px] rounded-br-[32px] shadow flex-col justify-start items-start gap-8 flex">
              <div className="Frame38 self-stretch h-[101px] flex-col justify-start items-start gap-4 flex">
                <div className="Frame32 self-stretch justify-start items-start inline-flex">
                  <div className="MountainViewAboveTheCloud grow shrink basis-0 text-gray-900 text-[23px] font-bold font-['Circular Std'] leading-7">
                    Mountain View, Above the cloud
                  </div>
                  <div className="15099 text-pink-500 text-[23px] font-bold font-['Circular Std'] leading-7">
                    $150.99
                  </div>
                </div>
                <div className="UnitedArabEmeries self-stretch text-gray-900 text-opacity-75 text-lg font-normal font-['Inter'] leading-[28.80px]">
                  United Arab Emeries{' '}
                </div>
              </div>
              <div className="Frame30 justify-start items-center gap-2 inline-flex">
                <div className="0 text-orange-600 text-[23px] font-bold font-['Circular Std'] leading-7">
                  5.0
                </div>
                <div className="Star1 w-6 h-6 relative" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Frame98 w-[1312px] py-16 left-0 top-[2552px] absolute justify-start items-end inline-flex">
        <img
          className="Group9238 w-[871px] h-[697px]"
          src="https://via.placeholder.com/871x697"
        />
        <div className="Frame97 grow shrink basis-0 flex-col justify-start items-start gap-16 inline-flex">
          <div className="Frame93 self-stretch h-[269px] flex-col justify-start items-start gap-8 flex">
            <div className="Frame92 self-stretch h-[150px] flex-col justify-start items-start gap-4 flex">
              <div className="TravelPoint self-stretch text-pink-500 text-[23px] font-bold font-['Circular Std'] uppercase leading-7 tracking-[4.60px]">
                Travel Point
              </div>
              <div className="WeHelpingYouFindYourDreamLocation self-stretch text-gray-900 text-[44px] font-bold font-['Circular Std'] leading-[52.80px]">
                We helping you find your dream location
              </div>
            </div>
            <div className="ContraryToPopularBeliefLoremIpsumIsNotSimplyRandomTextItHasRootsInAPieceOfClassicalLatinLiteratureFrom45Bc self-stretch text-gray-900 text-opacity-50 text-lg font-normal font-['Inter'] leading-[28.80px]">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC.
            </div>
          </div>
          <div className="Frame96 self-stretch h-[334px] flex-col justify-start items-start gap-8 flex">
            <div className="Frame94 self-stretch justify-start items-start gap-8 inline-flex">
              <div className="Frame40 grow shrink basis-0 p-8 bg-white rounded-[32px] border border-gray-900 border-opacity-10 flex-col justify-start items-center gap-4 inline-flex">
                <div className=" text-orange-600 text-[35px] font-bold font-['Circular Std'] leading-[42px]">
                  500+
                </div>
                <div className="HolidayPackage text-gray-900 text-lg font-normal font-['Inter'] leading-[28.80px]">
                  Holiday Package
                </div>
              </div>
              <div className="Frame41 grow shrink basis-0 p-8 bg-white rounded-[32px] border border-gray-900 border-opacity-10 flex-col justify-start items-center gap-4 inline-flex">
                <div className=" text-orange-600 text-[35px] font-bold font-['Circular Std'] leading-[42px]">
                  100
                </div>
                <div className="LuxuryHotel text-gray-900 text-lg font-normal font-['Inter'] leading-[28.80px]">
                  Luxury Hotel
                </div>
              </div>
            </div>
            <div className="Frame95 self-stretch justify-start items-start gap-8 inline-flex">
              <div className="Frame42 grow shrink basis-0 p-8 bg-white rounded-[32px] border border-gray-900 border-opacity-10 flex-col justify-start items-center gap-4 inline-flex">
                <div className=" text-orange-600 text-[35px] font-bold font-['Circular Std'] leading-[42px]">
                  7
                </div>
                <div className="PremiumAirlines text-gray-900 text-lg font-normal font-['Inter'] leading-[28.80px]">
                  Premium Airlines
                </div>
              </div>
              <div className="Frame43 grow shrink basis-0 p-8 bg-white rounded-[32px] border border-gray-900 border-opacity-10 flex-col justify-start items-center gap-4 inline-flex">
                <div className="K text-orange-600 text-[35px] font-bold font-['Circular Std'] leading-[42px]">
                  2k+
                </div>
                <div className="HappyCustomer text-gray-900 text-lg font-normal font-['Inter'] leading-[28.80px]">
                  Happy Customer
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img
        className="Frame50 w-[277px] h-[353px] left-[1163px] top-[2841px] absolute"
        src="https://via.placeholder.com/277x353"
      />
      <div className="Frame103 w-[1312px] py-16 left-[128px] top-[3377px] absolute justify-start items-start gap-[70px] inline-flex">
        <div className="Frame102 grow shrink basis-0 flex-col justify-start items-start gap-16 inline-flex">
          <div className="Frame100 self-stretch h-[216px] flex-col justify-start items-start gap-8 flex">
            <div className="Frame99 self-stretch h-[97px] flex-col justify-start items-start gap-4 flex">
              <div className="KeyFeatures self-stretch text-pink-500 text-[23px] font-bold font-['Circular Std'] uppercase leading-7 tracking-[4.60px]">
                Key features
              </div>
              <div className="WeOfferBestServices self-stretch text-gray-900 text-[44px] font-bold font-['Circular Std'] leading-[52.80px]">
                We offer best services
              </div>
            </div>
            <div className="ContraryToPopularBeliefLoremIpsumIsNotSimplyRandomTextItHasRootsInAPieceOfClassicalLatinLiteratureFrom45Bc self-stretch text-gray-900 text-opacity-50 text-lg font-normal font-['Inter'] leading-[28.80px]">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature
              <br />
              from 45 BC.
            </div>
          </div>
          <div className="Frame101 self-stretch h-[492px] flex-col justify-start items-start flex">
            <div className="Frame40 self-stretch p-8 bg-white rounded-[32px] justify-start items-center gap-8 inline-flex">
              <div className="Group9239 w-[100px] h-[100px] relative">
                <div className="Rectangle8 w-[100px] h-[100px] left-0 top-0 absolute bg-orange-600 rounded-[32px]" />
                <div className="Location2 w-12 h-12 left-[26px] top-[26px] absolute" />
              </div>
              <div className="Frame51 grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                <div className="WeOfferBestServices self-stretch text-gray-900 text-[23px] font-bold font-['Circular Std'] leading-7">
                  We offer best services
                </div>
                <div className="LoremIpsumIsNotSimplyRandomText self-stretch text-gray-900 text-opacity-50 text-lg font-normal font-['Inter'] leading-[28.80px]">
                  Lorem Ipsum is not simply random text
                </div>
              </div>
            </div>
            <div className="Frame41 self-stretch p-8 bg-white rounded-[32px] border border-gray-900 border-opacity-10 justify-start items-center gap-8 inline-flex">
              <div className="Group9239 w-[100px] h-[100px] relative">
                <div className="Rectangle8 w-[100px] h-[100px] left-0 top-0 absolute bg-amber-300 rounded-[32px]" />
                <div className="Calendar1 w-12 h-12 left-[24px] top-[24px] absolute" />
              </div>
              <div className="Frame51 grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                <div className="ScheduleYourTrip self-stretch text-gray-900 text-[23px] font-bold font-['Circular Std'] leading-7">
                  Schedule your trip
                </div>
                <div className="ItHasRootsInAPieceOfClassical self-stretch text-gray-900 text-opacity-50 text-lg font-normal font-['Inter'] leading-[28.80px]">
                  It has roots in a piece of classical
                </div>
              </div>
            </div>
            <div className="Frame42 self-stretch p-8 bg-white rounded-[32px] justify-start items-center gap-8 inline-flex">
              <div className="Group9239 w-[100px] h-[100px] relative">
                <div className="Rectangle8 w-[100px] h-[100px] left-0 top-0 absolute bg-pink-500 rounded-[32px]" />
                <div className="Ticket1 w-12 h-12 left-[26px] top-[26px] absolute" />
              </div>
              <div className="Frame51 grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                <div className="GetDiscountedCoupons self-stretch text-gray-900 text-[23px] font-bold font-['Circular Std'] leading-7">
                  Get discounted coupons
                </div>
                <div className="LoremIpsumIsNotSimplyRandomText self-stretch text-gray-900 text-opacity-50 text-lg font-normal font-['Inter'] leading-[28.80px]">
                  Lorem Ipsum is not simply random text
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          className="Background w-[693px] h-[869px]"
          src="https://via.placeholder.com/693x869"
        />
      </div>
      <div className="Layer1 w-[2506.20px] h-[958.64px] left-[-757.53px] top-[4424.87px] absolute origin-top-left rotate-[-9.37deg] opacity-10 justify-center items-center inline-flex" />
      <div className="Frame107 w-[1184px] left-[128px] top-[4386px] absolute justify-start items-center gap-14 inline-flex">
        <div className="Group9237 w-[100px] h-[100px] relative">
          <div className="Rectangle4 w-[100px] h-[100px] left-0 top-0 absolute bg-white rounded-[100px] border border-gray-900 border-opacity-10" />
          <div className="ArrowLeft1 w-6 h-6 left-[38px] top-[38px] absolute" />
        </div>
        <div className="Frame106 grow shrink basis-0 flex-col justify-start items-center gap-14 inline-flex">
          <div className="Frame104 self-stretch h-[97px] flex-col justify-start items-center gap-4 flex">
            <div className="Testimonials self-stretch text-center text-pink-500 text-[23px] font-bold font-['Circular Std'] uppercase leading-7 tracking-[4.60px]">
              Testimonials
            </div>
            <div className="TrustOurClients self-stretch text-center text-gray-900 text-[44px] font-bold font-['Circular Std'] leading-[52.80px]">
              Trust our clients
            </div>
          </div>
          <img
            className="Ellipse22 w-32 h-32 rounded-full"
            src="https://via.placeholder.com/128x128"
          />
          <div className="Frame105 self-stretch h-[98px] flex-col justify-start items-center gap-8 flex">
            <div className="MarkSmithTravelEnthusiast self-stretch text-center">
              <span className="text-orange-600 text-[28px] font-bold font-['Circular Std'] leading-[33.60px]">
                Mark Smith{' '}
              </span>
              <span className="text-gray-900 text-opacity-75 text-[23px] font-bold font-['Circular Std'] leading-7">
                / Travel Enthusiast
              </span>
            </div>
            <div className="Frame54 justify-center items-start gap-4 inline-flex">
              <div className="Star2 w-8 h-8 relative" />
              <div className="Star3 w-8 h-8 relative" />
              <div className="Star4 w-8 h-8 relative" />
              <div className="Star5 w-8 h-8 relative" />
              <div className="Star6 w-8 h-8 relative" />
            </div>
          </div>
          <div className="ContraryToPopularBeliefLoremIpsumIsNotSimplyRandomTextItHasRootsInAPieceOfClassicalLatinLiteratureFrom45Bc self-stretch text-center text-gray-900 text-opacity-75 text-[23px] font-['Circular Std'] leading-[36.80px]">
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots
            <br />
            in a piece of classical Latin literature from 45 BC.
          </div>
          <div className="Frame52 justify-start items-start gap-6 inline-flex">
            <div className="Ellipse20 w-6 h-6 bg-gray-900 bg-opacity-5 rounded-full" />
            <div className="Ellipse21 w-6 h-6 bg-pink-500 rounded-full" />
            <div className="Ellipse22 w-6 h-6 bg-gray-900 bg-opacity-5 rounded-full" />
          </div>
        </div>
        <div className="Group9236 w-[100px] h-[100px] relative">
          <div className="Rectangle5 w-[100px] h-[100px] left-[100px] top-0 absolute origin-top-left rotate-180 bg-indigo-600 rounded-[100px]" />
          <div className="ArrowLeft2 w-6 h-6 left-[62px] top-[38px] absolute origin-top-left rotate-180" />
        </div>
      </div>
      <div className="Frame39 h-[608px] px-16 py-32 left-[128px] top-[5208px] absolute bg-amber-300 bg-opacity-10 rounded-[32px] flex-col justify-start items-start gap-16 inline-flex">
        <div className="Frame110 self-stretch h-[352px] flex-col justify-start items-start gap-16 flex">
          <div className="Frame59 self-stretch h-48 flex-col justify-start items-start gap-8 flex">
            <div className="SubscribeToOurNewsletter self-stretch text-center text-pink-500 text-[23px] font-bold font-['Circular Std'] uppercase leading-7 tracking-[4.60px]">
              subscribe to our newsletter
            </div>
            <div className="PrepareYourselfLetSExploreTheBeautyOfTheWorld self-stretch text-center text-gray-900 text-[55px] font-bold font-['Circular Std'] leading-[66px]">
              Prepare yourself & let’s explore the beauty of the world
            </div>
          </div>
          <div className="Frame58 self-stretch justify-start items-start gap-16 inline-flex">
            <div className="Frame56 grow shrink basis-0 self-stretch p-8 bg-white rounded-[32px] justify-start items-center gap-4 flex">
              <div className="Message1 w-8 h-8 relative" />
              <div className="YourEmail text-center text-gray-900 text-opacity-75 text-[23px] font-bold font-['Circular Std'] leading-7">
                Your Email
              </div>
            </div>
            <div className="Frame57 w-[235px] self-stretch px-16 py-8 bg-indigo-600 rounded-[32px] justify-start items-center gap-4 flex">
              <div className="Subscribe text-center text-white text-[23px] font-bold font-['Circular Std'] leading-7">
                Subscribe
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="GraphicElements w-[183.86px] h-[176.35px] left-[93px] top-[5141px] absolute" />
      <div className="Objects w-[332px] h-[351.95px] left-[1328px] top-[5688px] absolute" />
      <div className="Frame78 w-[1184px] py-16 left-[128px] top-[5880px] absolute justify-start items-start gap-16 inline-flex">
        <div className="Frame60 grow shrink basis-0 flex-col justify-start items-start gap-16 inline-flex">
          <div className="Frame79 self-stretch h-[183px] flex-col justify-start items-start gap-8 flex">
            <div className="Frame1 justify-start items-center gap-4 inline-flex">
              <div className="Travlog text-gray-900 text-2xl font-black font-['Circular Std'] leading-10">
                Travlog
              </div>
            </div>
            <div className="ContraryToPopularBeliefLoremIpsumIsNotSimplyRandomTextItHasRootsInAPieceOfClassicalLatinLiteratureFrom45Bc self-stretch text-gray-900 text-opacity-50 text-[23px] font-['Circular Std'] leading-[36.80px]">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC.
            </div>
          </div>
          <div className="Frame72 justify-start items-start gap-8 inline-flex">
            <div className="Group w-8 h-8 relative"></div>
            <div className="Group8 w-8 h-8 relative"></div>
          </div>
        </div>
        <div className="Frame77 grow shrink basis-0 h-[306px] justify-start items-start gap-8 flex">
          <div className="Frame73 grow shrink basis-0 flex-col justify-start items-start gap-8 inline-flex">
            <div className="Company self-stretch text-gray-900 text-[23px] font-bold font-['Circular Std'] leading-7">
              Company
            </div>
            <div className="About self-stretch text-gray-900 text-opacity-75 text-lg font-normal font-['Inter'] leading-[28.80px]">
              About
            </div>
            <div className="Career self-stretch text-gray-900 text-opacity-75 text-lg font-normal font-['Inter'] leading-[28.80px]">
              Career
            </div>
            <div className="Mobile self-stretch text-gray-900 text-opacity-75 text-lg font-normal font-['Inter'] leading-[28.80px]">
              Mobile
            </div>
          </div>
          <div className="Frame74 grow shrink basis-0 flex-col justify-start items-start gap-8 inline-flex">
            <div className="Contact self-stretch text-gray-900 text-[23px] font-bold font-['Circular Std'] leading-7">
              Contact
            </div>
            <div className="WhyTravlog self-stretch text-gray-900 text-opacity-75 text-lg font-normal font-['Inter'] leading-[28.80px]">
              Why Travlog?
            </div>
            <div className="PartnerWithUs self-stretch text-gray-900 text-opacity-75 text-lg font-normal font-['Inter'] leading-[28.80px]">
              Partner with us
            </div>
            <div className="FaqS self-stretch text-gray-900 text-opacity-75 text-lg font-normal font-['Inter'] leading-[28.80px]">
              FAQ’s
            </div>
            <div className="Blog self-stretch text-gray-900 text-opacity-75 text-lg font-normal font-['Inter'] leading-[28.80px]">
              Blog
            </div>
          </div>
          <div className="Frame75 grow shrink basis-0 flex-col justify-start items-start gap-8 inline-flex">
            <div className="MeetUs self-stretch text-gray-900 text-[23px] font-bold font-['Circular Std'] leading-7">
              Meet Us
            </div>
            <div className="0092123456789 self-stretch text-gray-900 text-opacity-75 text-lg font-normal font-['Inter'] leading-[28.80px]">
              +00 92 1234 56789
            </div>
            <div className="InfoTravlogCom self-stretch text-gray-900 text-opacity-75 text-lg font-normal font-['Inter'] leading-[28.80px]">
              info@travlog.com
            </div>
            <div className="Frame76 self-stretch h-[95px] flex-col justify-start items-start gap-2 flex">
              <div className="RStreetNewYork self-stretch text-gray-900 text-opacity-75 text-lg font-normal font-['Inter'] leading-[28.80px]">
                205. R Street, New York
              </div>
              <div className="Bd23200 self-stretch text-gray-900 text-opacity-75 text-lg font-normal font-['Inter'] leading-[28.80px]">
                BD23200
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="GridVisualization w-[1280px] h-[6314px] left-0 top-0 absolute flex-col justify-center items-center inline-flex">
        <div className="ColumnGrid self-stretch grow shrink basis-0 px-32 justify-center items-start gap-8 inline-flex">
          <div className="Rectangle w-[69.33px] h-[6316px] bg-red-600 bg-opacity-10" />
          <div className="Rectangle w-[69.33px] h-[6316px] bg-red-600 bg-opacity-10" />
          <div className="Rectangle w-[69.33px] h-[6316px] bg-red-600 bg-opacity-10" />
          <div className="Rectangle w-[69.33px] h-[6316px] bg-red-600 bg-opacity-10" />
          <div className="Rectangle w-[69.33px] h-[6316px] bg-red-600 bg-opacity-10" />
          <div className="Rectangle w-[69.33px] h-[6316px] bg-red-600 bg-opacity-10" />
          <div className="Rectangle w-[69.33px] h-[6316px] bg-red-600 bg-opacity-10" />
          <div className="Rectangle w-[69.33px] h-[6316px] bg-red-600 bg-opacity-10" />
          <div className="Rectangle w-[69.33px] h-[6316px] bg-red-600 bg-opacity-10" />
          <div className="Rectangle w-[69.33px] h-[6316px] bg-red-600 bg-opacity-10" />
          <div className="Rectangle w-[69.33px] h-[6316px] bg-red-600 bg-opacity-10" />
          <div className="Rectangle w-[69.33px] h-[6316px] bg-red-600 bg-opacity-10" />
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
