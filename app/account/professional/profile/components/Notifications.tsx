"use client";
import { User } from "@/dbtypes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";

interface Form {
  email_notification_jobs: boolean;
  email_notification_messages: boolean;
  sms_notification_jobs: boolean;
  sms_notification_messages: boolean;
}

const Notifications = ({ user }: { user: any | null }) => {
  const supabase = createClientComponentClient();
  const [formData, setFormData] = useState<Form>({
    email_notification_jobs: false,
    email_notification_messages: false,
    sms_notification_jobs: false,
    sms_notification_messages: false,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: checked,
    }));
  };

  const getNotificationData = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("professionals")
        .select(
          "email_notification_jobs, email_notification_messages, sms_notification_jobs, sms_notification_messages"
        )
        .eq("id", user.id);

      if (error) {
        console.error("Error:", error);
        throw error;
      }

      if (data && data.length > 0) {
        const notificationData = data[0];
        setFormData({
          email_notification_jobs: notificationData.email_notification_jobs,
          email_notification_messages:
            notificationData.email_notification_messages,
          sms_notification_jobs: notificationData.sms_notification_jobs,
          sms_notification_messages: notificationData.sms_notification_messages,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }, [supabase, user.id]);

  useEffect(() => {
    getNotificationData();
  }, [getNotificationData]);

  async function updateNotificationData() {
    try {
      const { data, error } = await supabase
        .from("professionals")
        .update({
          email_notification_jobs: formData.email_notification_jobs,
          email_notification_messages: formData.email_notification_messages,
          sms_notification_jobs: formData.sms_notification_jobs,
          sms_notification_messages: formData.sms_notification_messages,
        })
        .eq("id", user.id)
        .select(
          "email_notification_messages, sms_notification_messages, email_notification_jobs, sms_notification_jobs"
        );

      if (error) {
        console.error("Error:", error.message);
        throw error;
      }
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  return (
    <form
      onSubmit={updateNotificationData}
      className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
    >
      <div className="px-4 py-6 sm:p-8">
        <div className="max-w-2xl space-y-10">
          <fieldset>
            <legend className="text-sm font-semibold leading-6 text-gray-900">
              By Email
            </legend>
            <div className="mt-6 space-y-6">
              <div className="relative flex gap-x-3">
                <div className="flex h-6 items-center">
                  <input
                    id="email_notification_messages"
                    name="email_notification_messages"
                    checked={formData.email_notification_messages}
                    onChange={handleChange}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                  />
                </div>
                <div className="text-sm leading-6">
                  <label
                    htmlFor="email_notification_messages"
                    className="font-medium text-gray-900"
                  >
                    Messages
                  </label>
                  <p className="text-gray-500">
                    Get notified when someone send you a message.
                  </p>
                </div>
              </div>

              <div className="relative flex gap-x-3">
                <div className="flex h-6 items-center">
                  <input
                    id="email_notification_jobs"
                    name="email_notification_jobs"
                    type="checkbox"
                    onChange={handleChange}
                    checked={formData.email_notification_jobs}
                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                  />
                </div>
                <div className="text-sm leading-6">
                  <label
                    htmlFor="email_notification_jobs"
                    className="font-medium text-gray-900"
                  >
                    Jobs
                  </label>
                  <p className="text-gray-500">
                    Get notified about job related events.
                  </p>
                </div>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend className="text-sm font-semibold leading-6 text-gray-900">
              Push Notifications
            </legend>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              These are delivered via SMS to your mobile phone.
            </p>
            <div className="mt-6 space-y-6">
              <div className="flex items-center gap-x-3">
                <input
                  id="push-everything"
                  name="sms_notification_jobs"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600"
                  checked={formData.sms_notification_jobs}
                  onChange={handleChange}
                />
                <div className="text-sm leading-6">
                  <label
                    htmlFor="comments"
                    className="font-medium text-gray-900"
                  >
                    Messages
                  </label>
                  <p className="text-gray-500">
                    Get notified when someone send you a message.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  id="push-email"
                  name="sms_notification_jobs"
                  type="radio"
                  onChange={handleChange}
                  checked={formData.sms_notification_messages}
                  className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600"
                />
                <div className="text-sm leading-6">
                  <label
                    htmlFor="sms_notification_jobs"
                    className="font-medium text-gray-900"
                  >
                    Jobs
                  </label>
                  <p className="text-gray-500">
                    Get notified about job related events.
                  </p>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
      <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={updateNotificationData}
          className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default Notifications;
