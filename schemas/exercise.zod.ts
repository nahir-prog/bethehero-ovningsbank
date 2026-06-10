/**
 * BTH Exercise Schema v1 — Zod-validator för Next.js-portalen
 *
 * Användning i portalen (/api/studio/publish-exercise eller import):
 *
 *   import { ExerciseSchema, type Exercise } from '@/schemas/exercise.zod';
 *
 *   const result = ExerciseSchema.safeParse(payload);
 *   if (!result.success) {
 *     return Response.json({ error: result.error.format() }, { status: 400 });
 *   }
 *   const exercise: Exercise = result.data;
 *
 * Eller använd ExercisePublicSchema vid mottag från AI-agent (utan internal-fältet):
 *
 *   const portalExport = ExercisePublicSchema.parse(payload);
 */

import { z } from 'zod';

// ── Sub-schemas ──

export const ImageSchema = z.object({
  url: z.string().url(),
  alt: z.string().min(3, 'alt måste vara minst 3 tecken'),
  generationPrompt: z.string().nullable().optional(),
});

export const TaxonomySchema = z
  .object({
    themes: z.array(z.string()).optional(),
    focusAreas: z.array(z.string()).optional(),
    learningAreas: z.array(z.string()).optional(),
    classNeeds: z.array(z.string()).optional(),
  })
  .partial();

export const SafetyLevelSchema = z.enum([
  'standard',
  'extra_care',
  'elevhalsa_recommended',
]);

export const SafetySchema = z.object({
  level: SafetyLevelSchema,
  note: z.string().nullable().optional(),
});

export const GradeSchema = z.enum(['F', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
export const StageSchema = z.enum([
  'F-klass',
  'lågstadiet',
  'mellanstadiet',
  'högstadiet',
]);

export const MetadataSchema = z.object({
  durationMinutes: z.number().int().positive(),
  preparationMinutes: z.number().int().min(0),
  gradeRange: z.array(GradeSchema).min(1, 'Minst en årskurs krävs'),
  stages: z.array(StageSchema).optional(),
  workForm: z.array(z.string()).min(1, 'Minst en arbetsform krävs'),
  materialNeeds: z.array(z.string()).optional(),
  cardNeeds: z.array(z.string()).optional(),
});

export const PrintMaterialKindSchema = z.enum([
  'poster',
  'worksheet',
  'cards',
  'template',
  'discussion_cards',
]);

export const PrintMaterialFormatSchema = z.enum(['A4', 'A3', 'A5']);

export const PrintMaterialAudienceSchema = z.enum([
  'classroom',
  'student',
  'teacher',
]);

export const PrintMaterialSchema = z.object({
  kind: PrintMaterialKindSchema,
  title: z.string().min(3),
  description: z.string().min(10, 'Beskrivning måste vara minst 10 tecken'),
  filename: z.string().min(3, 'filename krävs (relativ sökväg eller filnamn)'),
  format: PrintMaterialFormatSchema.default('A4'),
  audience: PrintMaterialAudienceSchema,
  printIntent: z
    .string()
    .min(15, 'printIntent: beskriv när läraren använder materialet (≥15 tecken)'),
  requiresColor: z.boolean().optional(),
  safeMargin: z.boolean().optional(),
  sourceExerciseId: z.string().regex(/^BTH-[A-Z0-9-]+$/).optional(),
  exerciseSlug: z.string().optional(),
  url: z.string().url().optional(),
});

export const LessonSetupSchema = z.object({
  safeStartText: z.string().max(400).nullable().optional(),
  preparation: z.string().min(5, 'Förberedelse-text krävs (minst 5 tecken)'),
  materials: z.string().min(5, 'Material-text krävs (minst 5 tecken)'),
  printMaterials: z.array(PrintMaterialSchema).default([]),
});

export const StepSchema = z.object({
  title: z.string().min(3).max(100),
  body: z
    .string()
    .min(15, 'Body måste vara minst 15 tecken')
    .max(600, 'Body får inte överstiga 600 tecken'),
  subItems: z.array(z.string()).optional(),
  teacherSays: z.string().optional(),
  timeEstimate: z.string().optional(),
});

export const ImplementationSchema = z.object({
  intro: z.string().nullable().optional(),
  steps: z.array(StepSchema).min(2, 'Minst 2 steg krävs'),
  outro: z.string().nullable().optional(),
});

export const ReflectionSchema = z.object({
  questions: z
    .array(z.string().min(10))
    .min(2, 'Minst 2 reflektionsfrågor krävs'),
});

export const TeacherSupportSchema = z
  .object({
    tips: z.array(z.string()).optional(),
    adaptations: z.array(z.string()).optional(),
    riskNote: z.string().nullable().optional(),
    npfSupport: z.string().nullable().optional(),
    followUp: z.string().nullable().optional(),
  })
  .partial();

export const SlideTypeSchema = z.enum([
  'intro',
  'instruction',
  'activity',
  'group_activity',
  'individual_task',
  'discussion',
  'group_reading',
  'open_discussion',
  'reflection',
  'voting',
  'visualization',
  'transition',
  'listening',
  'silence',
  'closing',
  'observation',
  'brainstorm',
  'concept',
  'creative_task',
  'guided_breathing',
  'presentation',
]);

export const SlideMoodSchema = z.enum([
  'energetic',
  'calm',
  'focused',
  'still',
  'collaborative',
  'clear',
]);

export const SlideSchema = z.object({
  title: z.string().min(1),
  body: z.string().nullable().optional(),
  prompt: z.string().nullable().optional(),
  instructionForTeacher: z.string().nullable().optional(),
  slideType: SlideTypeSchema.optional(),
  mood: SlideMoodSchema.optional(),
  durationEstimate: z.string().optional(),
  interactionType: z.string().optional(), // legacy alias
});

export const PresentationAudienceSchema = z.enum(['students', 'teacher', 'both']);
export const PresentationStatusSchema = z.enum(['draft', 'needs_review', 'ready']);

export const PresentationSchema = z.object({
  id: z.string().min(3),
  exerciseSlug: z.string(),
  title: z.string().min(3),
  audience: PresentationAudienceSchema,
  status: PresentationStatusSchema,
  slides: z.array(SlideSchema).min(1, 'Minst 1 slide krävs'),
});

export const ProvenanceSchema = z.object({
  author: z.string().min(2),
  source: z.string(),
  createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Använd YYYY-MM-DD'),
  language: z.string().min(2).max(5),
});

export const ProductionStatusSchema = z.enum([
  'utkast',
  'pedagogisk_granskning',
  'material_produktion',
  'sprakkoll',
  'klar_for_portal',
  'exporterad',
]);

export const InternalSchema = z.object({
  id: z.string().regex(/^BTH-[A-Z0-9-]+$/, 'ID måste börja med BTH-'),
  productionStatus: ProductionStatusSchema,
  qualityChecklist: z.any().nullable().optional(),
  notes: z.string().nullable().optional(),
  lockedFields: z.array(z.string()).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  createdBy: z.string().optional(),
});

// ── Top-level schemas ──

/**
 * ExercisePublicSchema — det som lämnar AI-agenten och går till portalen.
 * INNEHÅLLER INTE internal-fältet.
 */
export const ExercisePublicSchema = z.object({
  schemaVersion: z.literal(1),
  title: z.string().min(3).max(60),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Slug måste vara kebab-case')
    .min(3)
    .max(80),
  shortDescription: z.string().min(40).max(400),
  teacherPurpose: z.string().min(40).max(1000),
  image: ImageSchema.nullable().optional(),
  taxonomy: TaxonomySchema.optional(),
  safety: SafetySchema,
  metadata: MetadataSchema,
  requiresPrintMaterials: z.boolean(),
  lessonSetup: LessonSetupSchema,
  implementation: ImplementationSchema,
  reflection: ReflectionSchema,
  teacherSupport: TeacherSupportSchema,
  presentations: z.array(PresentationSchema).optional(),
  provenance: ProvenanceSchema,
});

/**
 * ExerciseSchema — server-side fullständig övning inklusive internal-data.
 * Används i HQ/Studio och redaktör-vyn.
 */
export const ExerciseSchema = ExercisePublicSchema.extend({
  internal: InternalSchema,
});

// ── Conditional validators ──

/**
 * Validera att extra_care-övningar har safeStartText och riskNote.
 */
export function validateExtraCareRules(exercise: z.infer<typeof ExercisePublicSchema>) {
  if (exercise.safety.level === 'extra_care') {
    const errors: string[] = [];
    if (!exercise.lessonSetup.safeStartText || exercise.lessonSetup.safeStartText.length < 20) {
      errors.push('extra_care: safeStartText måste finnas (minst 20 tecken)');
    }
    if (!exercise.teacherSupport.riskNote || exercise.teacherSupport.riskNote.length < 30) {
      errors.push('extra_care: riskNote måste finnas (minst 30 tecken)');
    }
    return errors;
  }
  return [];
}

/**
 * Validera att requiresPrintMaterials matchar printMaterials.
 */
export function validatePrintMaterialsRules(
  exercise: z.infer<typeof ExercisePublicSchema>
) {
  if (exercise.requiresPrintMaterials && exercise.lessonSetup.printMaterials.length === 0) {
    return ['requiresPrintMaterials=true: lessonSetup.printMaterials måste innehålla minst en post'];
  }
  return [];
}

/**
 * Full validering — schema + conditional rules.
 */
export function validateExercise(payload: unknown) {
  const parsed = ExercisePublicSchema.safeParse(payload);
  if (!parsed.success) {
    return { ok: false as const, errors: parsed.error.issues };
  }
  const conditional = [
    ...validateExtraCareRules(parsed.data),
    ...validatePrintMaterialsRules(parsed.data),
  ];
  if (conditional.length > 0) {
    return { ok: false as const, errors: conditional };
  }
  return { ok: true as const, data: parsed.data };
}

// ── Type exports ──

export type Exercise = z.infer<typeof ExerciseSchema>;
export type ExercisePublic = z.infer<typeof ExercisePublicSchema>;
export type Image = z.infer<typeof ImageSchema>;
export type Metadata = z.infer<typeof MetadataSchema>;
export type Step = z.infer<typeof StepSchema>;
export type Slide = z.infer<typeof SlideSchema>;
export type Presentation = z.infer<typeof PresentationSchema>;
export type Safety = z.infer<typeof SafetySchema>;
export type SlideType = z.infer<typeof SlideTypeSchema>;
export type SlideMood = z.infer<typeof SlideMoodSchema>;
export type ProductionStatus = z.infer<typeof ProductionStatusSchema>;

/**
 * Stripa internal-fältet — det som ALDRIG ska exporteras till portalen.
 */
export function toPortalExport(exercise: Exercise): ExercisePublic {
  const { internal: _internal, ...portalData } = exercise;
  return portalData;
}
