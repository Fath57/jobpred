import { FileText, Mail, Brain, Mic, MessageSquare, Megaphone, DollarSign } from "lucide-react";

export const sidebarSections = [
  {
    id: 'resume',
    title: 'Resume Analysis',
    icon: FileText,
    items: [
      {
        id: 'resume-analysis',
        title: 'Resume Analysis',
        path: '/dashboard/resume/analysis',
      },
      {
        id: 'resume-confection',
        title: 'Resume Confection',
        path: '/dashboard/resume/confection',
      },
    ],
  },
  {
    id: 'letters',
    title: 'Letter',
    icon: Mail,
    items: [
      {
        id: 'motivation-letter',
        title: 'Motivation Letter',
        path: '/dashboard/letters/motivation',
      },
      {
        id: 'follow-up-letter',
        title: 'Follow up letter',
        path: '/dashboard/letters/followup',
      },
    ],
  },
  {
    id: 'skills-tests',
    title: 'Skills Tests',
    icon: Brain,
    items: [
      {
        id: 'soft-skills-test',
        title: 'Soft Skills',
        path: '/dashboard/tests/soft-skills',
      },
      {
        id: 'hard-skills-test',
        title: 'Hard Skills',
        path: '/dashboard/tests/hard-skills',
      },
      {
        id: 'language-skills-test',
        title: 'Language Skills',
        path: '/dashboard/tests/language',
      },
      {
        id: 'personality-skills-test',
        title: 'Personality Skills',
        path: '/dashboard/tests/personality',
      },
      {
        id: 'hr-interview-prep',
        title: 'HR Interview prep',
        path: '/dashboard/tests/hr-prep',
      },
      {
        id: 'test-feedback',
        title: 'Test feedback',
        path: '/dashboard/tests/feedback',
      },
    ],
  },
  {
    id: 'speech-skills',
    title: 'Speech to Speech Skills',
    icon: Mic,
    items: [
      {
        id: 'speech-soft-skills',
        title: 'Soft skills',
        path: '/dashboard/speech/soft-skills',
      },
      {
        id: 'speech-hard-skills',
        title: 'Hard skills',
        path: '/dashboard/speech/hard-skills',
      },
      {
        id: 'speech-language-skills',
        title: 'Language skills',
        path: '/dashboard/speech/language',
      },
      {
        id: 'speech-personality-skills',
        title: 'Personality skills',
        path: '/dashboard/speech/personality',
      },
      {
        id: 'speech-hr-prep',
        title: 'HR Interview Prep',
        path: '/dashboard/speech/hr-prep',
      },
      {
        id: 'speech-feedback',
        title: 'Test feedback',
        path: '/dashboard/speech/feedback',
      },
    ],
  },
  {
    id: 'communication-bundle',
    title: 'Communication Bundle',
    icon: MessageSquare,
    items: [
      {
        id: 'suggested-subjects',
        title: 'Suggested subjects',
        path: '/dashboard/communication/subjects',
      },
      {
        id: 'communication-planning',
        title: 'Communication planning',
        path: '/dashboard/communication/planning',
      },
      {
        id: 'linkedin-connection',
        title: 'LinkedIn connection for improvement suggestions',
        path: '/dashboard/communication/linkedin',
      },
    ],
  },
  {
    id: 'communication-production',
    title: 'Communication Production Bundle',
    icon: Megaphone,
    items: Array.from({ length: 8 }, (_, i) => ({
      id: `comm-${i + 1}`,
      title: `Comm ${i + 1}`,
      path: `/dashboard/production/comm-${i + 1}`
    }))
  },
  {
    id: 'pricing',
    title: 'Pricing',
    icon: DollarSign,
    items: [
      {  id: 'pricing-options', title: 'Options', path: '/admin/pricing/options' },
      {  id: 'pricing-packs', title: 'Packs', path: '/admin/pricing/packs' },
      {  id: 'pricing-analytics', title: 'Analytics Pricing', path: '/admin/pricing/analytics' }
    ]
  },
 
   {
    id: 'user-managment',
    title: 'Privilèges',
    icon: Megaphone,
       items: [
           { id: 'permission-manage', title: 'Gestion de rôles', path: '/admin/roles' },
           { id: 'user-view', title: 'Gestion des utilisateurs', path: '/admin/users' },

       ]
  },

];

