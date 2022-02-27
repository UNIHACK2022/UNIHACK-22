import React from "react";
import { Stack as StackIcon, Check } from "phosphor-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import { useEffect } from "react";

export default function Layers({ mapLayer, triggerParentUpdate }) {
  const [value, setValue] = React.useState("");

  // Change layer state in parent component when radio toggled
  useEffect(() => {
    triggerParentUpdate(value);
    console.log(value);
  }, [value]);

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <IconButton
          size="sm"
          px="0px"
          py="0px"
          aria-label="Map layers"
          icon={<StackIcon size={20} weight="bold" />}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Layers</PopoverHeader>
        <PopoverBody>
          <RadioGroup onChange={setValue} value={value} >
            <Stack>
              <Radio value="1" defaultChecked="true">Base</Radio>
              <Radio value="2">Households with solar</Radio>
              <Radio value="3">Dwelling density</Radio>
              <Radio value="4">NCC Climate Zone 1-9</Radio>
            </Stack>
          </RadioGroup>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
