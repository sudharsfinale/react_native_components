import { View, Text } from "react-native";
import React, { useState } from "react";
import flightData from "@/data.json";
import { FlatList } from "react-native-gesture-handler";
import { formatShortDate, formatTime } from "@/utils/date_time_utils";
import TimelineNew from "@/components/TimelineNew";
import Header from "@/components/Header";
const TimelineContainer = () => {
  let firstFlightOffer = flightData.data[0].processed;
  let flightItineraries: any = firstFlightOffer.itineraries;
  let airportList = flightData.airportList;
  let aircraftList = flightData.aircraftList;
  let airlineList = flightData.airlineList;
  const [showFullTimeline, setShowFullTimeline] = useState(false);
  const getAirportInfo = (code: any) => {
    let found_airport_info = airportList.find((item) => item.code === code);
    return found_airport_info;
  };
  const getAirlineInfo = (code: any) => {
    let found_airport_info = airlineList.find((item) => item.code === code);
    return found_airport_info;
  };
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Header headerTitle="Timeline" />
      {flightItineraries &&
      Array.isArray(flightItineraries) &&
      flightItineraries.length ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={[]}
          renderItem={() => <View></View>}
          ListHeaderComponent={
            <View
              style={{
                paddingHorizontal: 20,
                flex: 1,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#e7e7e7",
                marginHorizontal: 20,
                marginVertical: 12,
                paddingVertical: 12,
              }}
            >
              <FlatList
                showsVerticalScrollIndicator={false}
                style={{ flexGrow: 1 }}
                data={flightItineraries}
                renderItem={({ item, index }) => {
                  let current_segments = item?.segments;
                  let current_segments_copy = [...current_segments];
                  let minimal_segments = [current_segments[0]];
                  let segments_to_show = showFullTimeline
                    ? current_segments
                    : minimal_segments;
                  return (
                    <FlatList
                      data={segments_to_show}
                      showsVerticalScrollIndicator={false}
                      renderItem={({ item, index }) => {
                        let isLastIndex = segments_to_show.length === index + 1;
                        let isFirstIndex = index === 0;
                        let departure_airport_details = getAirportInfo(
                          item?.departure?.iataCode
                        );
                        let airline_details = getAirlineInfo(item?.carrierCode);
                        let departure_date = formatShortDate(
                          item?.departure?.at
                        );
                        let departure_time = formatTime(item?.departure?.at);
                        let arrival_airport_details = getAirportInfo(
                          item?.arrival?.iataCode
                        );
                        let arrival_date = formatShortDate(item?.arrival?.at);
                        let arrival_time = formatTime(item?.arrival?.at);
                        let block_details = {
                          departure_flight_details: {
                            departure_airport_name:
                              departure_airport_details?.airport_name,
                            departure_terminal: item?.departure?.terminal,
                            departure_time: departure_time,
                            departure_date: departure_date,
                          },
                          arrival_flight_details: {
                            arrival_airport_name:
                              arrival_airport_details?.airport_name,
                            arrival_terminal: item?.arrival?.terminal,
                            arrival_time: arrival_time,
                            arrival_date: arrival_date,
                          },
                          airline_details,
                        };
                        console.log(
                          current_segments?.length,
                          "item inside itn mapping"
                        );

                        return (
                          // <Timeline
                          //   isLastIndex={isLastIndex}
                          //   blockDetails={block_details}
                          // />
                          <TimelineNew
                            isFirstIndex={isFirstIndex}
                            isLastIndex={isLastIndex}
                            showFullTimeline={showFullTimeline}
                            setShowFullTimeline={setShowFullTimeline}
                          />
                        );
                      }}
                    />
                  );
                }}
              />
            </View>
          }
        />
      ) : null}
    </View>
  );
};

export default TimelineContainer;
