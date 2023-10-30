import { Avatar, Box, Flex, Text } from "@radix-ui/themes";
import React from "react";

const Comment = () => {
  return (
    <Box className="w-full">
      <Flex align="start" className="!gap-2">
        <Avatar
          variant="solid"
          fallback="JF"
          className="!w-6 !h-6 !p-1 text-xs !font-medium !tracking-[0.04px] !text-white !bg-[#3E63DD] !rounded"
        />
        <Box>
          <Flex align="center" className="!gap-2 !mt-1 !mb-2">
            <Text size="1" weight="bold">
              James Franco
            </Text>
            <Text size="1" color="gray">
              23 min ago
            </Text>
          </Flex>
          <Text as="div" size="2" className="!text-[#1C2024]">
            also, keep in mind that his will be a chrome extension just to start
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Comment;
