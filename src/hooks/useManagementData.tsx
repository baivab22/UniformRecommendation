import { useState, useEffect } from "react";

export interface ManagementItem {
  id: string;
  name: string;
  created_at: string;
  parent_id?: string;
}

export const useManagementData = () => {
  const [schools, setSchools] = useState<ManagementItem[]>([]);
  const [colleges, setColleges] = useState<ManagementItem[]>([]);
  const [batches, setBatches] = useState<ManagementItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // In production, these would come from separate Supabase tables
      const sampleSchools = [
        { id: 'school-1', name: 'ABC High School', created_at: new Date().toISOString() },
        { id: 'school-2', name: 'XYZ Academy', created_at: new Date().toISOString() }
      ];
      
      const sampleColleges = [
        { id: 'college-1', name: 'State University', created_at: new Date().toISOString() },
        { id: 'college-2', name: 'City College', created_at: new Date().toISOString() },
        { id: 'college-3', name: 'Tech Institute', created_at: new Date().toISOString() }
      ];
      
      const sampleBatches = [
        { id: 'batch-1', name: '2024 Batch', created_at: new Date().toISOString(), parent_id: 'college-1' },
        { id: 'batch-2', name: '2025 Batch', created_at: new Date().toISOString(), parent_id: 'college-1' },
        { id: 'batch-3', name: '2024 Engineering', created_at: new Date().toISOString(), parent_id: 'college-2' },
        { id: 'batch-4', name: '2024 CS', created_at: new Date().toISOString(), parent_id: 'college-3' }
      ];

      setSchools(sampleSchools);
      setColleges(sampleColleges);
      setBatches(sampleBatches);
    } catch (error) {
      console.error("Error fetching management data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCollegeName = (collegeId: string) => {
    return colleges.find(c => c.id === collegeId)?.name || 'Unknown College';
  };

  const getBatchesByCollege = (collegeId: string) => {
    return batches.filter(batch => batch.parent_id === collegeId);
  };

  return {
    schools,
    colleges,
    batches,
    loading,
    refetch: fetchData,
    getCollegeName,
    getBatchesByCollege
  };
};