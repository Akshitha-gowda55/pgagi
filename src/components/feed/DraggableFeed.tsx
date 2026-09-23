"use client";

import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";

import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import { ContentCard } from "@/components/content/ContentCard";
import { reorderItems } from "@/features/feed/feedSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooks";

import type { UnifiedContentItem } from "@/types/content";

interface DraggableItemProps {
  item: UnifiedContentItem;
}

function DraggableItem({
  item,
}: DraggableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `${item.type}-${item.id}`,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`touch-none ${
        isDragging
          ? "z-20 scale-[1.02] opacity-80"
          : ""
      }`}
    >
      <ContentCard item={item} />
    </div>
  );
}

interface DraggableFeedProps {
  items: UnifiedContentItem[];
}

export function DraggableFeed({
  items,
}: DraggableFeedProps) {
  const dispatch = useAppDispatch();

  const orderedIds = useAppSelector(
    (state) => state.feed.orderedIds,
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  /*
   * Map the Redux ordering to the current items.
   */
  const orderMap = new Map(
    orderedIds.map((id, index) => [
      String(id),
      index,
    ]),
  );

  /*
   * Apply the saved ordering to the API items.
   */
  const sortedItems = [...items].sort(
    (a, b) => {
      const aId = `${a.type}-${a.id}`;
      const bId = `${b.type}-${b.id}`;

      const aIndex = orderMap.get(aId);
      const bIndex = orderMap.get(bId);

      if (
        aIndex === undefined &&
        bIndex === undefined
      ) {
        return 0;
      }

      if (aIndex === undefined) {
        return 1;
      }

      if (bIndex === undefined) {
        return -1;
      }

      return aIndex - bIndex;
    },
  );

  function handleDragEnd(
    event: DragEndEvent,
  ) {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const activeId = String(active.id);
    const overId = String(over.id);

    if (activeId === overId) {
      return;
    }

    /*
     * If Redux already contains both IDs,
     * reorder them directly.
     */
    if (
      orderedIds.includes(activeId) &&
      orderedIds.includes(overId)
    ) {
      const oldIndex =
        orderedIds.indexOf(activeId);

      const newIndex =
        orderedIds.indexOf(overId);

      if (
        oldIndex !== -1 &&
        newIndex !== -1
      ) {
        dispatch(
          reorderItems({
            oldIndex,
            newIndex,
          }),
        );
      }

      return;
    }

    /*
     * Fallback for items not yet represented
     * in orderedIds.
     */
    const currentIds = sortedItems.map(
      (item) => `${item.type}-${item.id}`,
    );

    const movedFrom =
      currentIds.indexOf(activeId);

    const movedTo =
      currentIds.indexOf(overId);

    if (
      movedFrom !== -1 &&
      movedTo !== -1
    ) {
      /*
       * If Redux doesn't contain these IDs yet,
       * initialize the feed ordering first.
       *
       * The feed slice's reorderItems reducer
       * can only move items that already exist
       * in orderedIds, so we don't dispatch here.
       *
       * This case should normally not occur because
       * the dashboard initializes feed ordering.
       */
      return;
    }
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={sortedItems.map(
          (item) =>
            `${item.type}-${item.id}`,
        )}
        strategy={rectSortingStrategy}
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {sortedItems.map((item) => (
            <DraggableItem
              key={`${item.type}-${item.id}`}
              item={item}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}