
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Filter, 
  Download, 
  Plus 
} from "lucide-react";

interface DataTableProps<T> {
  columns: {
    id: string;
    header: string;
    cell: (item: T) => React.ReactNode;
    className?: string;
  }[];
  data: T[];
  groupKey?: keyof T;
  groupHeaderRenderer?: (groupValue: any) => React.ReactNode;
  searchPlaceholder?: string;
  emptyStateMessage?: string;
  noFilteredDataMessage?: string;
}

export function DataTable<T>({
  columns,
  data,
  groupKey,
  groupHeaderRenderer,
  searchPlaceholder = "Search...",
  emptyStateMessage = "No data available",
  noFilteredDataMessage = "No results found"
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  
  // Group data by the groupKey if provided
  const groupedData = groupKey
    ? data.reduce((groups, item) => {
        const groupValue = String(item[groupKey]);
        if (!groups[groupValue]) {
          groups[groupValue] = [];
        }
        groups[groupValue].push(item);
        return groups;
      }, {} as Record<string, T[]>)
    : { "": data };

  // Filter data based on search query
  const filterData = (items: T[]) => {
    if (!searchQuery) return items;
    
    return items.filter(item => 
      Object.values(item).some(value => 
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(groupId)) {
        newSet.delete(groupId);
      } else {
        newSet.add(groupId);
      }
      return newSet;
    });
  };
  
  // Check if all groups are empty after filtering
  const allGroupsEmpty = Object.values(groupedData).every(group => 
    filterData(group).length === 0
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={searchPlaceholder}
            className="pl-9 w-full sm:w-[240px] bg-muted"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 ml-auto">
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="h-9">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm" className="h-9">
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[400px] bg-muted/20 rounded-lg border border-dashed">
          <p className="text-muted-foreground">{emptyStateMessage}</p>
        </div>
      ) : allGroupsEmpty ? (
        <div className="flex flex-col items-center justify-center h-[400px] bg-muted/20 rounded-lg border border-dashed">
          <p className="text-muted-foreground">{noFilteredDataMessage}</p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                {groupKey && <TableHead className="w-[30px]"></TableHead>}
                {columns.map((column) => (
                  <TableHead 
                    key={column.id} 
                    className={column.className || ""}
                  >
                    {column.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(groupedData).map(([groupValue, items]) => {
                const filteredItems = filterData(items);
                if (filteredItems.length === 0) return null;
                
                return (
                  <React.Fragment key={groupValue}>
                    {groupKey && groupValue && (
                      <TableRow 
                        className="bg-muted/30 hover:bg-muted/40 cursor-pointer" 
                        onClick={() => toggleGroup(groupValue)}
                      >
                        <TableCell className="p-2">
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            {expandedGroups.has(groupValue) ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </TableCell>
                        <TableCell colSpan={columns.length} className="font-medium">
                          {groupHeaderRenderer ? groupHeaderRenderer(groupValue) : groupValue}
                          <span className="ml-2 text-xs text-muted-foreground">
                            ({filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'})
                          </span>
                        </TableCell>
                      </TableRow>
                    )}
                    
                    {(expandedGroups.has(groupValue) || !groupKey || !groupValue) &&
                      filteredItems.map((item, itemIndex) => (
                        <TableRow 
                          key={`item-${itemIndex}`} 
                          className="animate-fade-in"
                        >
                          {groupKey && groupValue && <TableCell />}
                          {columns.map((column) => (
                            <TableCell 
                              key={`${itemIndex}-${column.id}`} 
                              className={column.className || ""}
                            >
                              {column.cell(item)}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
