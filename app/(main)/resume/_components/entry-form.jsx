// app/resume/_components/entry-form.jsx
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parse } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { entrySchema } from "@/app/lib/schema";
import {
  Sparkles,
  PlusCircle,
  X,
  Loader2,
} from "lucide-react";
import { improveWithAI } from "@/actions/resume";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";

const formatDisplayDate = (dateString) => {
  if (!dateString) return "";
  const date = parse(dateString, "yyyy-MM", new Date());
  return format(date, "MMM yyyy");
};

export function EntryForm({ type, entries, onChange }) {
  const [isAdding, setIsAdding] = useState(false);

  const {
    register,
    handleSubmit: handleValidation,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      title: "",
      organization: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
    },
  });

  const current = watch("current");

  const handleAdd = handleValidation((data) => {
    const formattedEntry = {
      ...data,
      startDate: formatDisplayDate(data.startDate),
      endDate: data.current ? "" : formatDisplayDate(data.endDate),
    };

    onChange([...entries, formattedEntry]);

    reset();
    setIsAdding(false);
  });

  const handleDelete = (index) => {
    const newEntries = entries.filter((_, i) => i !== index);
    onChange(newEntries);
  };

  const {
    loading: isImproving,
    fn: improveWithAIFn,
    data: improvedContent,
    error: improveError,
  } = useFetch(improveWithAI);

  useEffect(() => {
    if (improvedContent && !isImproving) {
      setValue("description", improvedContent);
      toast.success("✨ Description improved successfully!");
    }
    if (improveError) {
      toast.error(improveError.message || "Failed to improve description");
    }
  }, [improvedContent, improveError, isImproving, setValue]);

  const handleImproveDescription = async () => {
    const description = watch("description");
    if (!description) {
      toast.error("Please enter a description first");
      return;
    }

    await improveWithAIFn({
      current: description,
      type: type.toLowerCase(),
    });
  };

  return (
    <div className="space-y-6">

      {/* Existing Entries */}
      <div className="space-y-4">
        {entries.map((item, index) => (
          <Card
            key={index}
            className="bg-white/5 backdrop-blur-xl border border-white/10 
            shadow-xl hover:shadow-indigo-500/10 transition-all duration-300"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-semibold 
              bg-gradient-to-r from-indigo-400 to-purple-400 
              bg-clip-text text-transparent">
                {item.title} @ {item.organization}
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                type="button"
                className="hover:bg-red-500/20"
                onClick={() => handleDelete(index)}
              >
                <X className="h-4 w-4 text-red-400" />
              </Button>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-gray-400">
                {item.current
                  ? `${item.startDate} - Present`
                  : `${item.startDate} - ${item.endDate}`}
              </p>
              <p className="mt-3 text-sm whitespace-pre-wrap text-gray-200">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Entry Form */}
      {isAdding && (
        <Card className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold 
            bg-gradient-to-r from-white via-indigo-400 to-purple-400 
            bg-clip-text text-transparent">
              Add {type}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">

            {/* Title + Organization */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Title/Position"
                {...register("title")}
                className="bg-black/40 border-white/10 focus:ring-indigo-500"
              />
              <Input
                placeholder="Organization/Company"
                {...register("organization")}
                className="bg-black/40 border-white/10 focus:ring-indigo-500"
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="month"
                {...register("startDate")}
                className="bg-black/40 border-white/10"
              />
              <Input
                type="month"
                {...register("endDate")}
                disabled={current}
                className="bg-black/40 border-white/10"
              />
            </div>

            {/* Current Checkbox */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                {...register("current")}
                onChange={(e) => {
                  setValue("current", e.target.checked);
                  if (e.target.checked) setValue("endDate", "");
                }}
                className="accent-indigo-500"
              />
              <label className="text-sm text-gray-300">
                Current {type}
              </label>
            </div>

            {/* Description */}
            <Textarea
              placeholder={`Description of your ${type.toLowerCase()}`}
              className="h-32 bg-black/40 border-white/10 focus:ring-indigo-500"
              {...register("description")}
            />

            {/* AI Improve Button */}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleImproveDescription}
              disabled={isImproving || !watch("description")}
              className="border-indigo-500/40 text-indigo-300 
              hover:bg-indigo-500/20 transition-all"
            >
              {isImproving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Improving with AI...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2 text-indigo-400" />
                  Improve with AI
                </>
              )}
            </Button>
          </CardContent>

          <CardFooter className="flex justify-end gap-3">
            <Button
              variant="ghost"
              onClick={() => {
                reset();
                setIsAdding(false);
              }}
            >
              Cancel
            </Button>

            <Button
              onClick={handleAdd}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Entry
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Add Button */}
      {!isAdding && (
        <Button
          className="w-full bg-white/5 backdrop-blur-xl border border-white/10 
          hover:bg-indigo-500/20 transition-all"
          variant="outline"
          onClick={() => setIsAdding(true)}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add {type}
        </Button>
      )}
    </div>
  );
}