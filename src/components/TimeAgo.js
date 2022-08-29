import React from "react";
import { formatDistanceToNow } from "date-fns";
import { parseISO } from "date-fns/esm";
import { Text, useColorModeValue } from "@chakra-ui/react";

const TimeAgo = ({ timestamp }) => {
  const timeTextColor = useColorModeValue(
    "rgba(0, 0, 0, 0.35)",
    "rgba(255, 255, 255, 0.52)"
  );
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }
  return (
    <Text color={timeTextColor} width="60%">
      {timeAgo}
    </Text>
  );
};

export default TimeAgo;
