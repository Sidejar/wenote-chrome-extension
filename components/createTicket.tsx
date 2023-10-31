import React from "react";

import {
  Box,
  Button,
  Flex,
  Heading,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import { Formik } from "formik";

const CreateTicket = () => {
  return (
    <Box className="w-[400px] h-auto p-6 bg-white rounded-xl shadow border border-slate-900 border-opacity-5 ">
      <Heading size="5" className="!text-neutral-800 ">
        Create ticket
      </Heading>
      <Text as="p" size="2" className="!text-neutral-800 !mt-3 !mb-4">
        Convert this comment to a ticket in your connected PM tool.
      </Text>

      <Formik
        initialValues={{
          project: "Select project",
          title: "",
          status: "Choose a status",
          assignee: "Add assignee",
        }}
        validate={(values) => {
          const errors = {};

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <Flex direction="column" className="!gap-2">
              <Text size="2" weight="bold">
                Project
              </Text>
              <Select.Root
                name="project"
                onChange={handleChange}
                onBlur={handleBlur}
                className="!w-full"
                defaultValue={values.project}
              >
                <Select.Trigger />
                <Select.Content>
                  <Select.Group>
                    <Select.Item value="orange">Orange</Select.Item>
                    <Select.Item value="apple">Apple</Select.Item>
                    <Select.Item value="grape">Grape</Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </Flex>

            <Flex direction="column" className="!gap-2">
              <Text size="2" weight="bold">
                Title
              </Text>
              <TextField.Input
                placeholder="Add ticket title"
                type="title"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
            </Flex>

            <Flex direction="column" className="!gap-2">
              <Text size="2" weight="bold">
                Status
              </Text>
              <Select.Root
                name="status"
                onChange={handleChange}
                onBlur={handleBlur}
                className="!w-full"
                defaultValue={values.status}
              >
                <Select.Trigger />
                <Select.Content>
                  <Select.Group>
                    <Select.Item value="orange">Orange</Select.Item>
                    <Select.Item value="apple">Apple</Select.Item>
                    <Select.Item value="grape">Grape</Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </Flex>

            <Flex direction="column" className="!gap-2">
              <Text size="2" weight="bold">
                Assignee
              </Text>
              <Select.Root
                name="assignee"
                onChange={handleChange}
                onBlur={handleBlur}
                className="!w-full"
                defaultValue={values.assignee}
              >
                <Select.Trigger />
                <Select.Content>
                  <Select.Group>
                    <Select.Item value="orange">Orange</Select.Item>
                    <Select.Item value="apple">Apple</Select.Item>
                    <Select.Item value="grape">Grape</Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </Flex>

            <Flex justify="end" align="center" className="!gap-3 w-full mt-12">
              <Button
                type="button"
                className="!h-8 !cursor-pointer !px-3 !text-sm !font-medium !text-[#60646C] !bg-slate-900 !bg-opacity-5 !rounded justify-center items-center gap-2 inline-flex"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="!h-8 !px-3 !text-sm !cursor-pointer !font-medium !text-white  !bg-opacity-5 !rounded justify-center items-center gap-2 inline-flex"
              >
                Create ticket
              </Button>
            </Flex>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateTicket;
