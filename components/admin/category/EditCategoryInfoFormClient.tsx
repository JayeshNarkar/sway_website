"use client";

import { useEffect, useMemo, useState, FormEvent } from "react";
import {
  saveCategoryInfo,
  removeCategoryInfo,
} from "@/components/admin/category/edit-category-info";

type Category = { id: number; name: string };
export type CategoryInfo = { id: number; categoryId: number; info: string[] };

export default function EditCategoryInfoFormClient({
  categories,
  categoryInfos,
}: {
  categories: Category[];
  categoryInfos: CategoryInfo[];
}) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(
    categories?.[0]?.id ?? 0
  );

  const currentInfo = useMemo(() => {
    return (
      categoryInfos?.find((c) => c.categoryId === selectedCategoryId) ?? null
    );
  }, [categoryInfos, selectedCategoryId]);

  const [lines, setLines] = useState<string[]>(
    currentInfo?.info?.length ? currentInfo.info : [""]
  );
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    setLines(currentInfo?.info?.length ? currentInfo.info : [""]);
    setMsg(null);
  }, [currentInfo, selectedCategoryId]);

  function updateLine(idx: number, value: string) {
    setLines((s) => s.map((l, i) => (i === idx ? value : l)));
  }

  function addLine(afterIdx?: number) {
    setLines((s) => {
      const next = [...s];
      if (afterIdx == null) next.push("");
      else next.splice(afterIdx + 1, 0, "");
      return next;
    });
  }

  function removeLine(idx: number) {
    setLines((s) => (s.length <= 1 ? [""] : s.filter((_, i) => i !== idx)));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      const payload = lines.map((l) => l.trim()).filter((l) => l.length > 0);
      const res = await saveCategoryInfo(selectedCategoryId, payload);
      setMsg(res.message ?? (res.success ? "Saved" : "Failed"));
    } catch (err) {
      console.log(err);
      setMsg("Failed to save category info");
    } finally {
      setSaving(false);
    }
  }

  async function onClear() {
    setSaving(true);
    setMsg(null);
    try {
      const res = await removeCategoryInfo(selectedCategoryId);
      setMsg(res.message ?? (res.success ? "Cleared" : "Failed"));
      setLines([""]);
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      console.log(err);
      setMsg("Failed to clear category info");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full p-4 space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
          className="mt-1 block w-full rounded border-gray-300"
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Info / Description lines
        </label>
        <div className="mt-2 space-y-2">
          {lines.map((line, idx) => (
            <div key={idx} className="flex items-start space-x-2">
              <input
                type="text"
                value={line}
                onChange={(e) => updateLine(idx, e.target.value)}
                placeholder={`Line ${idx + 1}`}
                className="flex-1 rounded border-gray-300 px-2 py-1"
              />
              <button
                type="button"
                onClick={() => addLine(idx)}
                className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
                title="Add line below"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => removeLine(idx)}
                className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                title="Remove line"
              >
                −
              </button>
            </div>
          ))}
        </div>
        <div className="mt-2">
          <button
            type="button"
            onClick={() => addLine()}
            className="px-3 py-1 bg-gray-200 rounded text-sm"
          >
            Add new line
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          disabled={saving}
          onClick={onClear}
          className="px-4 py-2 bg-gray-600 text-white rounded disabled:opacity-60"
        >
          Clear for category
        </button>
      </div>
      {msg && <span className="text-sm text-gray-600">{msg}</span>}
    </form>
  );
}
