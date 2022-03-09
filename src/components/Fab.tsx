import React, { useCallback } from "react";
import { IconButton, Box } from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";

const Fab = () => {

  const goTopPage = useCallback(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }, [])
  return (
    <>
      <Box
        style={{
          position: "fixed",
          bottom: 50,
          right: 30,
        }}
      >
          <IconButton
            borderRadius={200}
            colorScheme="blue"
            aria-label="Call Segun"
            size={"lg"}
            icon={<ArrowUpIcon />}
            onClick={goTopPage}
          />
      </Box>
    </>
  );
};

export default Fab;