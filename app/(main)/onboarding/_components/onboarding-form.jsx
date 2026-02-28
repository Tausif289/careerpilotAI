"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/use-fetch";
import { onboardingSchema } from "@/app/lib/schema";
import { updateUser } from "@/actions/user";

const OnboardingForm = ({ industries }) => {
  const router = useRouter();
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  const {
    loading: updateLoading,
    fn: updateUserFn,
    data: updateResult,
  } = useFetch(updateUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });

  const onSubmit = async (values) => {
    try {
      const formattedIndustry = `${values.industry}-${values.subIndustry
        .toLowerCase()
        .replace(/ /g, "-")}`;

      await updateUserFn({
        ...values,
        industry: formattedIndustry,
      });
    } catch (error) {
      console.error("Onboarding error:", error);
    }
  };

  useEffect(() => {
    if (updateResult?.success && !updateLoading) {
      toast.success("Profile completed successfully!");
      router.push("/dashboard");
      router.refresh();
    }
  }, [updateResult, updateLoading]);

  const watchIndustry = watch("industry");

 return (
  <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

   
    

    <Card className="relative w-full max-w-xl mx-4 
      bg-white/5 backdrop-blur-xl 
      border border-white/10 
      shadow-2xl shadow-black/40 
      rounded-3xl">

      <CardHeader className="text-center space-y-4">
        <CardTitle className="text-4xl font-extrabold 
          bg-gradient-to-r from-white via-indigo-400 to-purple-400 
          bg-clip-text text-transparent">
          Activate Your AI Career Profile
        </CardTitle>

        <CardDescription className="text-gray-400 text-base">
          Let our AI personalize insights, growth strategies, and industry intelligence tailored to you.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Industry */}
          <div className="space-y-2">
            <Label className="text-gray-300">Industry</Label>
            <Select
              onValueChange={(value) => {
                setValue("industry", value);
                setSelectedIndustry(
                  industries.find((ind) => ind.id === value)
                );
                setValue("subIndustry", "");
              }}
            >
              <SelectTrigger className="bg-white/5 border-white/10 text-white focus:ring-indigo-500">
                <SelectValue placeholder="Select your industry" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/10 text-white">
                <SelectGroup>
                  <SelectLabel className="text-gray-400">
                    Industries
                  </SelectLabel>
                  {industries.map((ind) => (
                    <SelectItem key={ind.id} value={ind.id}>
                      {ind.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.industry && (
              <p className="text-sm text-red-400">
                {errors.industry.message}
              </p>
            )}
          </div>

          {/* Specialization */}
          {watchIndustry && (
            <div className="space-y-2">
              <Label className="text-gray-300">Specialization</Label>
              <Select
                onValueChange={(value) => setValue("subIndustry", value)}
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white focus:ring-indigo-500">
                  <SelectValue placeholder="Select specialization" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10 text-white">
                  <SelectGroup>
                    <SelectLabel className="text-gray-400">
                      Specializations
                    </SelectLabel>
                    {selectedIndustry?.subIndustries.map((sub) => (
                      <SelectItem key={sub} value={sub}>
                        {sub}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.subIndustry && (
                <p className="text-sm text-red-400">
                  {errors.subIndustry.message}
                </p>
              )}
            </div>
          )}

          {/* Experience */}
          <div className="space-y-2">
            <Label className="text-gray-300">Years of Experience</Label>
            <Input
              type="number"
              min="0"
              max="50"
              placeholder="e.g., 3"
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-indigo-500"
              {...register("experience")}
            />
            {errors.experience && (
              <p className="text-sm text-red-400">
                {errors.experience.message}
              </p>
            )}
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <Label className="text-gray-300">Core Skills</Label>
            <Input
              placeholder="Python, React, Leadership, AI..."
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-indigo-500"
              {...register("skills")}
            />
            <p className="text-xs text-gray-500">
              Separate multiple skills with commas
            </p>
            {errors.skills && (
              <p className="text-sm text-red-400">
                {errors.skills.message}
              </p>
            )}
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label className="text-gray-300">Professional Bio</Label>
            <Textarea
              placeholder="Summarize your experience, expertise, and goals..."
              className="h-32 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-indigo-500"
              {...register("bio")}
            />
            {errors.bio && (
              <p className="text-sm text-red-400">
                {errors.bio.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={updateLoading}
            className="w-full rounded-xl 
              bg-gradient-to-r from-indigo-600 to-purple-600 
              hover:from-indigo-500 hover:to-purple-500 
              text-white font-semibold 
              shadow-lg shadow-indigo-900/40 
              transition-all duration-300 hover:scale-[1.02]"
          >
            {updateLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Activating Profile...
              </>
            ) : (
              "Launch My AI Dashboard"
            )}
          </Button>

        </form>
      </CardContent>
    </Card>
  </div>
);
};

export default OnboardingForm;