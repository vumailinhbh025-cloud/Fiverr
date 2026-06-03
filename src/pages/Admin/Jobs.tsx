import { useCallback, useEffect, useMemo, useState } from "react";
import { httpClient } from "../../util/config";
import type { JobModel } from "../../ViewModel/JobModel";

const perPageOptions = [10, 20, 50];

const asString = (value: unknown): string => {
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return String(value);
  }
  return "";
};

const extractJobList = (data: unknown): JobModel[] => {
  const responseData = data as {
    content?: unknown;
    items?: unknown;
    data?: unknown;
    [key: string]: unknown;
  };
  const rawData =
    responseData.content ?? responseData.items ?? responseData.data ?? data;

  if (Array.isArray(rawData)) {
    return rawData as JobModel[];
  }

  if (rawData && typeof rawData === "object") {
    const arr = Object.values(rawData).find((value) => Array.isArray(value));
    if (Array.isArray(arr)) {
      return arr as JobModel[];
    }
  }

  return [];
};

const Jobs = () => {
  const [jobs, setJobs] = useState<JobModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selectedJob, setSelectedJob] = useState<JobModel | null>(null);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await httpClient.get("/api/cong-viec");
      setJobs(extractJobList(res.data));
    } catch (err: unknown) {
      const apiError = err as {
        response?: { data?: { content?: string; message?: string } };
        message?: string;
      };
      console.error(err);
      setError(
        apiError.response?.data?.content ||
          apiError.response?.data?.message ||
          apiError.message ||
          "Failed to load jobs",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return jobs;

    return jobs.filter((job) => {
      const searchable = [
        job.id,
        job.tenCongViec,
        job.moTaNgan,
        job.giaTien,
        job.nguoiTao,
        job.maChiTietLoaiCongViec,
      ]
        .map(asString)
        .join(" ")
        .toLowerCase();

      return searchable.includes(q);
    });
  }, [jobs, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [page, totalPages]);

  const pageData = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page, perPage]);

  const handleDeleteJob = (_job: JobModel) => {
    alert("Chuc nang xoa hien dang tam khoa");
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="mb-1">Quản lý công việc</h2>
          <div className="d-flex flex-wrap gap-2 small">
            <span className="badge bg-secondary">Total: {jobs.length}</span>
            <span className="badge bg-success">Showing: {filtered.length}</span>
          </div>
        </div>
        <button
          className="btn btn-outline-secondary"
          onClick={fetchJobs}
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-3">
          <div className="d-flex justify-content-between align-items-center gap-3 mb-3 flex-wrap">
            <div>
              <h4 className="mb-0">Công việc </h4>
              <small className="text-muted">List from /api/cong-viec</small>
            </div>

            <div className="d-flex gap-2 align-items-center flex-wrap">
              <div
                className="input-group input-group-sm"
                style={{ width: 320 }}
              >
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search id, name, price..."
                  className="form-control"
                />
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setQuery("");
                    setPage(1);
                  }}
                >
                  Clear
                </button>
              </div>
              <select
                className="form-select form-select-sm"
                value={perPage}
                onChange={(e) => {
                  setPerPage(Number(e.target.value));
                  setPage(1);
                }}
                style={{ width: 110 }}
              >
                {perPageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}/page
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="table-responsive">
            <table className="table table-sm table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th style={{ width: 52 }}>#</th>
                  <th>Job</th>
                  <th style={{ width: 110 }}>Price</th>
                  <th style={{ width: 130 }}>Rating</th>
                  <th style={{ width: 120 }}>Creator</th>
                  <th style={{ width: 150 }}></th>
                </tr>
              </thead>
              <tbody>
                {pageData.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-4">
                      {loading ? "Loading jobs..." : "No jobs found"}
                    </td>
                  </tr>
                )}

                {pageData.map((job, index) => (
                  <tr key={job.id}>
                    <td>{(page - 1) * perPage + index + 1}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div
                          style={{ width: 42, height: 42, minWidth: 42 }}
                          className="rounded overflow-hidden bg-light d-flex align-items-center justify-content-center"
                        >
                          {job.hinhAnh ? (
                            <img
                              src={job.hinhAnh}
                              alt="job"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <span className="text-muted small">#{job.id}</span>
                          )}
                        </div>
                        <div
                          className="text-truncate"
                          style={{ maxWidth: 560 }}
                        >
                          <div className="fw-semibold text-truncate">
                            {job.tenCongViec}
                          </div>
                          <div className="small text-muted text-truncate">
                            ID: {job.id} | Category detail:{" "}
                            {job.maChiTietLoaiCongViec}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="fw-semibold">${job.giaTien}</td>
                    <td>
                      <div className="small">
                        <span className="text-warning fw-semibold">
                          {job.saoCongViec}
                        </span>
                        <span className="text-muted"> ({job.danhGia})</span>
                      </div>
                    </td>
                    <td>{job.nguoiTao}</td>
                    <td>
                      <div className="d-flex justify-content-end gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => setSelectedJob(job)}
                        >
                          View
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteJob(job)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
            <div className="small text-muted">
              Showing {pageData.length} of {filtered.length} matched
            </div>
            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-sm btn-outline-secondary"
                disabled={page <= 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
              >
                Prev
              </button>
              <span className="small text-muted px-2 text-nowrap">
                Page {page} / {totalPages}
              </span>
              <button
                className="btn btn-sm btn-outline-secondary"
                disabled={page >= totalPages}
                onClick={() =>
                  setPage((current) => Math.min(totalPages, current + 1))
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {selectedJob && (
        <div
          className="modal d-block"
          tabIndex={-1}
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <div>
                  <h5 className="modal-title mb-1">Chi tiet cong viec</h5>
                  <div className="small text-muted">
                    Job ID: {selectedJob.id}
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setSelectedJob(null)}
                />
              </div>
              <div className="modal-body">
                <div className="row g-4">
                  <div className="col-12 col-md-5">
                    <div
                      className="rounded overflow-hidden bg-light"
                      style={{ aspectRatio: "4 / 3" }}
                    >
                      {selectedJob.hinhAnh ? (
                        <img
                          src={selectedJob.hinhAnh}
                          alt={selectedJob.tenCongViec}
                          className="w-100 h-100"
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <div className="w-100 h-100 d-flex align-items-center justify-content-center text-muted">
                          No image
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-md-7">
                    <h4 className="fw-bold mb-3">{selectedJob.tenCongViec}</h4>
                    <div className="row g-2 mb-3">
                      <div className="col-6">
                        <div className="border rounded p-2">
                          <div className="small text-muted">Price</div>
                          <div className="fw-semibold">
                            ${selectedJob.giaTien}
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="border rounded p-2">
                          <div className="small text-muted">Creator</div>
                          <div className="fw-semibold">
                            {selectedJob.nguoiTao}
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="border rounded p-2">
                          <div className="small text-muted">Rating</div>
                          <div className="fw-semibold">
                            {selectedJob.saoCongViec} sao ({selectedJob.danhGia}
                            )
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="border rounded p-2">
                          <div className="small text-muted">
                            Category detail
                          </div>
                          <div className="fw-semibold">
                            {selectedJob.maChiTietLoaiCongViec}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="fw-semibold mb-1">Mo ta ngan</div>
                      <p className="text-muted mb-0">
                        {selectedJob.moTaNgan || "-"}
                      </p>
                    </div>
                    <div>
                      <div className="fw-semibold mb-1">Mo ta</div>
                      <p
                        className="text-muted mb-0"
                        style={{ whiteSpace: "pre-line" }}
                      >
                        {selectedJob.moTa || "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setSelectedJob(null)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDeleteJob(selectedJob)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
