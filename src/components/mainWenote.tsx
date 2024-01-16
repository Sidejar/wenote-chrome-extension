import { Box, Button, Card, Flex, Heading, Text } from '@radix-ui/themes'
import React from 'react'

import { createMarkupDetail } from '~services/markup'

import GoogleIcon from '../../assets/images/google-logo.svg'
import WenoteLogo from '../../assets/images/wenote-logo.svg'

const MainWenote = ({ allMarkup, newMarkupUrl }) => {
  const login = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse: any) => {
      console.log('res', codeResponse)
    },
    onError: (error) => console.log('Login Failed:', error),
    scope: ' https://www.googleapis.com/auth/userinfo.profile',
  })
  return (
    <Card className="w-[300px] !bg-white !p-3   border border-solid border-[#01012e21] !rounded-xl ">
      <img
        src={WenoteLogo}
        alt="Wenote Logo"
        className="w-fit h-auto  object-contain mb-[27px]"
      />

      <Box className="!mb-[27px]">
        {true ? (
          <>
            <Button
              onClick={() => login()}
              radius="small"
              variant="soft"
              className="w-full !cursor-pointer !justify-start !gap-6 !h-auto !px-2 !py-[11px]  !text-sm !bg-white  !font-medium !text-[#0000008a] shadow-md"
            >
              <img src={GoogleIcon} alt="google" width="18" height="18" /> Sign
              in with Google
            </Button>
          </>
        ) : (
          <Flex gap="3" align="center" justify="between">
            <Button
              radius="small"
              variant="soft"
              className="w-fit !cursor-pointer !justify-start !gap-6 !h-auto !px-2 !py-1  !text-xs !font-medium !tracking-[0.04px] !text-[#00259ecc] !bg-[#0144ff0f] "
            >
              Integrations
            </Button>
            <Button
              radius="small"
              variant="soft"
              onClick={() => {
                console.log('newMarkupUrl', newMarkupUrl)
                console.log('mar', newMarkupUrl?.split('/')[2])
                const markupName = newMarkupUrl?.split('/')[2]
                // chrome.tabs.create({
                //   url: `./tabs/delta-flyer.html?mid=${1}`
                // })
                setTimeout(async () => {
                  const response = await createMarkupDetail(13, {
                    name: markupName,
                    url: newMarkupUrl,
                  })
                  if (response?.status === 201) {
                    chrome.tabs.create({
                      url: `./tabs/delta-flyer.html?id=${response?.data?.id}`,
                    })
                  } else {
                    console.log('markup url not found')
                  }
                }, 1000)
              }}
              className="w-fit !cursor-pointer !justify-start !gap-6 !h-auto !px-2 !py-1  !text-xs !font-medium !tracking-[0.04px] !text-[#60646C] !bg-[#00003b0d] "
            >
              Create markup
            </Button>
          </Flex>
        )}
      </Box>
      <Flex direction="column" className="!gap-4">
        <Heading as="h2" size="2">
          History
        </Heading>
        {allMarkup ? (
          <>
            {allMarkup?.length > 0 ? (
              <>
                {allMarkup?.map((item: any, index: number) => (
                  <Flex
                    key={item}
                    gap="1"
                    justify="between"
                    className="cursor-pointer"
                    onClick={() =>
                      chrome.tabs.create({
                        url: `./tabs/delta-flyer.html?id=${item?.id}`,
                      })
                    }
                  >
                    <Text className="!text-xs  !leading-5 !font-normal  !text-[#00259ecc] border-b border-solid border-[#023eeb26]">
                      {item.name}
                    </Text>
                    <Box className="w-fit flex !h-5 px-2 rounded-[3px] py-[2px] bg-[#0144ff0f]">
                      <Text className="!text-xs !font-medium !tracking-[0.04px] !text-[#00259ecc]">
                        {item.totalConvo}
                      </Text>
                    </Box>
                  </Flex>
                ))}
              </>
            ) : (
              <>
                <Box className="text-[12px] text-center">No Result Found</Box>
              </>
            )}
          </>
        ) : (
          <Box>Loading...</Box>
        )}
      </Flex>
    </Card>
  )
}

export default MainWenote
