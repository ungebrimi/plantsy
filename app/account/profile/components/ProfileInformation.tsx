"use client"
import React, { useCallback, useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User } from '@/dbtypes';
import Avatar from './Avatar';

interface Form {
  website: string | null;
  about: string | null;
  profile_picture: string | null;
}

const ProfileInformation = ({ user }: { user: User | null }) => {
  const supabase = createClientComponentClient();
  const [formData, setFormData] = useState<Form>({
    website: null,
    about: null,
    profile_picture: null,
  });

  const getProfileData = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('website, about, profile_picture')
        .eq('id', user.id);

      if (error) {
        console.error(error);
        throw error;
      }

      if (data && data.length > 0) {
        setFormData((prevFormData: Form) => ({
          ...prevFormData,
          website: data[0].website,
          about: data[0].about,
          profile_picture: data[0].profile_picture,
        }));
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, [setFormData, supabase, user.id]);

  useEffect(() => {
    getProfileData();
  }, [getProfileData]);


  async function updateProfileInformation() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          website: formData.website,
          about: formData.about,
          profile_picture: formData.profile_picture,
        })
        .eq('id', user.id)
        .select();

      if (error) {
        console.error('error:', error.message);
        throw error;
      }
      console.log("updated profile information successfully")
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return (
    <form onSubmit={updateProfileInformation} className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
      <div className="px-4 py-6 sm:p-8">
        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
              Website
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md">
                <input
                  type="text"
                  name="website"
                  id="website"
                  value={formData.website ?? ''}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="www.example.com"
                />
              </div>
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
              About
            </label>
            <div className="mt-2">
              <textarea
                id="about"
                name="about"
                onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                value={formData.about ?? ''}
                rows={3}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
          </div>
          <Avatar formData={formData} setFormData={setFormData} />
        </div>
      </div>
      <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="button"
          onClick={updateProfileInformation}
          className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          Save
        </button>
      </div>
    </form>
  )
}

export default ProfileInformation
